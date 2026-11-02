import React, { useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { authApi } from './api';
import TandoorLoginScreen from './TandoorLoginScreen';
import TandoorMenuDashboard from './TandoorMenuDashboard';

export default function TandoorPortal() {
  const [user, setUser] = useState(() => authApi.getCurrentUser());
  const [token, setToken] = useState(() => authApi.getAuthToken());
  const [toast, setToast] = useState({ open: false, title: '', msg: '', type: 'info' });

  const showToast = useCallback((title, msg, type = 'info') => {
    setToast({ open: true, title, msg, type });
  }, []);

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleLoginSuccess = (loggedInUser, authToken) => {
    setUser(loggedInUser);
    setToken(authToken);
  };

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
    setToken(null);
    showToast('Signed Out', 'You have been logged out of the portal.', 'info');
  };

  return (
    <>
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 2 }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.type || 'info'}
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            fontSize: '13.5px',
            fontWeight: 500,
          }}
        >
          {toast.title && <strong style={{ display: 'block', marginBottom: '2px' }}>{toast.title}</strong>}
          {toast.msg}
        </Alert>
      </Snackbar>

      {!user || !token ? (
        <TandoorLoginScreen
          onLoginSuccess={handleLoginSuccess}
          showToast={showToast}
        />
      ) : (
        <TandoorMenuDashboard
          user={user}
          onLogout={handleLogout}
          showToast={showToast}
        />
      )}
    </>
  );
}
