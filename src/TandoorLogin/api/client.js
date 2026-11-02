import { API_BASE_URL } from './config';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Universal API client for Tandoor backend with automatic Bearer token injection
 * and token refresh support.
 */
export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const headers = { ...options.headers };
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Handle 401 Unauthorized (Token Expired)
    if (response.status === 401 && endpoint !== '/auth/login' && endpoint !== '/auth/refresh-token') {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          if (headers['Authorization']) {
            headers['Authorization'] = `Bearer ${newToken}`;
          }
          return fetch(url, { ...config, headers }).then((res) => {
            if (!res.ok) {
              return res.json().then((errData) => {
                throw new Error(errData.message || `API error: ${res.status}`);
              });
            }
            return res.json();
          });
        });
      }

      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken');
      let refreshedToken = null;

      if (refreshToken) {
        try {
          const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken, refreshToken }),
          });

          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            if (refreshData?.token) {
              refreshedToken = refreshData.token;
              localStorage.setItem('authToken', refreshedToken);
              if (refreshData.refresh_token) {
                localStorage.setItem('refreshToken', refreshData.refresh_token);
              }
            }
          }
        } catch (e) {
          console.warn('[apiClient] Refresh token failed:', e);
        }
      }

      // Silent re-login if refresh token failed
      if (!refreshedToken) {
        try {
          const savedPhone = localStorage.getItem('savedPhone');
          const savedPassword = localStorage.getItem('savedPassword');
          if (savedPhone && savedPassword) {
            const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ phone: savedPhone, password: savedPassword }),
            });
            if (loginRes.ok) {
              const loginData = await loginRes.json();
              if (loginData?.success && loginData?.token) {
                refreshedToken = loginData.token;
                localStorage.setItem('authToken', refreshedToken);
                if (loginData.refresh_token) {
                  localStorage.setItem('refreshToken', loginData.refresh_token);
                }
              }
            }
          }
        } catch (reAuthErr) {
          console.warn('[apiClient] Silent re-authentication failed:', reAuthErr);
        }
      }

      if (refreshedToken) {
        processQueue(null, refreshedToken);
        isRefreshing = false;
        headers['Authorization'] = `Bearer ${refreshedToken}`;
        const retryRes = await fetch(url, { ...config, headers });
        if (!retryRes.ok) {
          const errData = await retryRes.json().catch(() => ({}));
          throw new Error(errData.message || `API error: ${retryRes.status}`);
        }
        return await retryRes.json();
      } else {
        processQueue(new Error('Session validation failed'), null);
        isRefreshing = false;
        throw new Error('Your session has expired. Please sign in again.');
      }
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`apiClient Error [${url}]:`, error);
    throw error;
  }
}
