import { apiClient } from './client';

export const authApi = {
  /**
   * Log into Tandoor Hotel Manager/Admin backend
   * Validates Role 0 (Owner/Admin) and Role 1 (Manager)
   */
  async login(phoneNumber, password, rememberMe = false) {
    const cleanPhone = String(phoneNumber || '').replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      throw new Error('Please enter a valid 10-digit mobile number.');
    }
    if (!password) {
      throw new Error('Please enter your password.');
    }

    const formattedPhone = `+91${cleanPhone}`;
    const data = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        phone: formattedPhone,
        password: password,
      }),
    });

    if (data && data.success && data.token) {
      const roleId =
        data.user?.role_id ??
        data.user?.roleid ??
        data.user?.roleId ??
        data.role_id ??
        data.roleid;

      if (Number(roleId) !== 0 && Number(roleId) !== 1) {
        throw new Error('Access denied. Only administrators and managers are authorized to access this portal.');
      }

      const userObj = {
        ...data.user,
        role_id: Number(roleId),
      };

      localStorage.setItem('authToken', data.token);
      if (data.refresh_token) {
        localStorage.setItem('refreshToken', data.refresh_token);
      }
      localStorage.setItem('user', JSON.stringify(userObj));

      if (rememberMe) {
        localStorage.setItem('savedPhone', formattedPhone);
        localStorage.setItem('savedPassword', password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('savedPhone');
        localStorage.removeItem('savedPassword');
        localStorage.removeItem('rememberMe');
      }

      return { user: userObj, token: data.token };
    }

    throw new Error(data?.message || 'Invalid phone number or password.');
  },

  /**
   * Read the currently cached user
   */
  getCurrentUser() {
    try {
      const u = localStorage.getItem('user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  /**
   * Read stored token
   */
  getAuthToken() {
    return localStorage.getItem('authToken');
  },

  /**
   * Log out and wipe session tokens
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('branchId');
    localStorage.removeItem('branchCode');
    localStorage.removeItem('branchName');
    localStorage.removeItem('selectedBranch');
    if (localStorage.getItem('rememberMe') !== 'true') {
      localStorage.removeItem('savedPhone');
      localStorage.removeItem('savedPassword');
    }
  },

  /**
   * Retrieve saved credentials for remember-me autofill
   */
  getSavedCredentials() {
    const rawPhone = localStorage.getItem('savedPhone') || '';
    return {
      phone: rawPhone.replace('+91', ''),
      password: localStorage.getItem('savedPassword') || '',
      rememberMe: localStorage.getItem('rememberMe') === 'true',
    };
  },
};
