import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
  Stack,
  Chip,
} from '@mui/material';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ChefHat,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { authApi } from './api';

export default function TandoorLoginScreen({ onLoginSuccess, showToast }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load saved credentials if present
  useEffect(() => {
    const saved = authApi.getSavedCredentials();
    if (saved.phone) setPhone(saved.phone);
    if (saved.password) setPassword(saved.password);
    if (saved.rememberMe) setRememberMe(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      if (showToast) showToast('Validation Error', 'Enter 10-digit mobile number.', 'warning');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your account password.');
      if (showToast) showToast('Validation Error', 'Please enter your password.', 'warning');
      return;
    }

    try {
      setLoading(true);
      const { user, token } = await authApi.login(cleanPhone, password, rememberMe);
      if (showToast) {
        showToast(
          'Login Successful',
          `Welcome back, ${user.name || (user.role_id === 0 ? 'Administrator' : 'Manager')}!`,
          'success'
        );
      }
      if (onLoginSuccess) {
        onLoginSuccess(user, token);
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.message || 'Login failed. Please check credentials.';
      setErrorMessage(msg);
      if (showToast) showToast('Login Failed', msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: '#090d16',
      }}
    >
      {/* Left Brand Panel */}
      <Box
        sx={{
          flex: { xs: 'none', md: 1.1 },
          background:
            'radial-gradient(circle at 20% 30%, rgba(170, 59, 255, 0.25) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(1, 135, 95, 0.2) 0%, transparent 50%), #090d16',
          p: { xs: 3, sm: 5, md: 7 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: { md: '1px solid rgba(255, 255, 255, 0.08)' },
          position: 'relative',
        }}
      >
        <Box>
          <Button
            component={Link}
            to="/homedelivery"
            startIcon={<ArrowLeft size={16} />}
            sx={{
              color: '#cbd5e1',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '999px',
              px: 2,
              py: 0.8,
              textTransform: 'none',
              fontSize: '13.5px',
              fontWeight: 500,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.16)',
                color: '#fff',
              },
            }}
          >
            Back to Dhion Website
          </Button>
        </Box>

        <Box sx={{ my: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '24px',
              bgcolor: '#ffffff',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              mb: 3,
            }}
          >
            <Box
              component="img"
              src="/tandoor/Tandoor_Corner.png"
              alt="Hotel Tandoor Corner"
              sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#34d399',
              mb: 1,
            }}
          >
            Complete Food Ordering & Delivery Management System
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '32px', md: '44px' },
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-1px',
              mb: 2,
            }}
          >
            Hotel Tandoor Corner
          </Typography>

          <Typography
            sx={{
              fontSize: '15.5px',
              color: '#94a3b8',
              lineHeight: 1.6,
              maxWidth: 520,
              mb: 4,
            }}
          >
            Centralized restaurant manager portal for managing menu catalog, dish pricing,
            live kitchen status, categories, and branch-level discounts.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: 540 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                flex: 1,
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <Sparkles size={16} color="#c084fc" />
                <Typography sx={{ color: '#f1f5f9', fontWeight: 600, fontSize: '14px' }}>
                  Live Menu Management
                </Typography>
              </Stack>
              <Typography sx={{ color: '#64748b', fontSize: '12.5px', lineHeight: 1.4 }}>
                Instant category updates, pricing, and food item toggles across customer apps.
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                flex: 1,
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <ShieldCheck size={16} color="#34d399" />
                <Typography sx={{ color: '#f1f5f9', fontWeight: 600, fontSize: '14px' }}>
                  Role Authorization
                </Typography>
              </Stack>
              <Typography sx={{ color: '#64748b', fontSize: '12.5px', lineHeight: 1.4 }}>
                Secured access restricted to restaurant owners and branch managers.
              </Typography>
            </Paper>
          </Stack>
        </Box>

        <Typography sx={{ fontSize: '13px', color: '#64748b' }}>
          Powered by <strong>Dhion Technologies</strong> &bull; Version 2.0 Web
        </Typography>
      </Box>

      {/* Right Form Panel */}
      <Box
        sx={{
          flex: { xs: 'none', md: 0.9 },
          bgcolor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 5, md: 6 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 440 }}>
          <Chip
            icon={<ChefHat size={14} color="#aa3bff" />}
            label="Manager & Owner Portal"
            sx={{
              fontWeight: 700,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#aa3bff',
              bgcolor: 'rgba(170, 59, 255, 0.08)',
              border: '1px solid rgba(170, 59, 255, 0.2)',
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.5px',
              mb: 0.5,
            }}
          >
            Sign In
          </Typography>

          <Typography sx={{ fontSize: '14px', color: '#64748b', mb: 3 }}>
            Enter your 10-digit registered mobile number and password to manage your menu.
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: '8px' }}>
              {errorMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Phone input */}
            <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#334155', mb: 0.75 }}>
              Mobile Number
            </Typography>
            <TextField
              fullWidth
              size="medium"
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              inputProps={{ maxLength: 10, inputMode: 'numeric' }}
              disabled={loading}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: '#64748b', fontWeight: 600 }}>
                      <Phone size={16} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>+91</Typography>
                    </Stack>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2.5 }}
            />

            {/* Password input */}
            <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#334155', mb: 0.75 }}>
              Password
            </Typography>
            <TextField
              fullWidth
              size="medium"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Remember Me */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#aa3bff' } }}
                  />
                }
                label={<Typography sx={{ fontSize: '13.5px', color: '#475569' }}>Remember Credentials</Typography>}
              />
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Lock size={18} />}
              sx={{
                height: 48,
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '15px',
                textTransform: 'none',
                background: 'linear-gradient(135deg, #aa3bff 0%, #7c3aed 100%)',
                boxShadow: '0 6px 20px rgba(170, 59, 255, 0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #9333ea 0%, #6d28d9 100%)',
                  boxShadow: '0 8px 24px rgba(170, 59, 255, 0.45)',
                },
              }}
            >
              {loading ? 'Verifying Credentials...' : 'Login to Hotel Tandoor Corner'}
            </Button>
          </Box>

          <Paper
            variant="outlined"
            sx={{
              mt: 3,
              p: 2,
              bgcolor: '#f8fafc',
              borderColor: '#e2e8f0',
              borderRadius: '10px',
            }}
          >
            <Typography sx={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>
              Access Authorization:
            </Typography>
            <Typography sx={{ fontSize: '12px', color: '#64748b', mt: 0.5, lineHeight: 1.45 }}>
              Only verified restaurant managers (Role 1) and administrators (Role 0) can log in.
              Customer accounts are not permitted in this management portal.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
