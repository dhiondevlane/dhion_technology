import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Switch,
  TextField,
  Button,
  IconButton,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  Clock,
  Truck,
  CreditCard,
  Percent,
  Bot,
  MapPin,
  Sparkles,
  RotateCcw,
  Image as ImageIcon,
  User,
  ChevronDown,
  Save,
  Trash2,
  Upload,
  CheckCircle,
  AlertCircle,
  Shield,
  Phone,
  Store,
  LogOut,
} from 'lucide-react';
import { settingsApi, resolveImageUrl } from './api';

export default function TandoorSettingsView({
  selectedBranch,
  setSelectedBranch,
  user,
  onLogout,
  showToast,
}) {
  const [expandedSection, setExpandedSection] = useState('shifts');
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [savingSection, setSavingSection] = useState('');

  // 1. Shifts State
  const shiftsConfig = selectedBranch?.shifts;
  const [shiftsEnabled, setShiftsEnabled] = useState(shiftsConfig?.is_shifts_enabled ?? true);
  const [morningActive, setMorningActive] = useState(shiftsConfig?.morning_shift?.is_active ?? true);
  const [morningStart, setMorningStart] = useState(shiftsConfig?.morning_shift?.start_time ?? '11:00 AM');
  const [morningEnd, setMorningEnd] = useState(shiftsConfig?.morning_shift?.end_time ?? '03:30 PM');
  const [nightActive, setNightActive] = useState(shiftsConfig?.night_shift?.is_active ?? true);
  const [nightStart, setNightStart] = useState(shiftsConfig?.night_shift?.start_time ?? '07:00 PM');
  const [nightEnd, setNightEnd] = useState(shiftsConfig?.night_shift?.end_time ?? '11:30 PM');

  // 2. Delivery Status & Payment Methods
  const [homeDeliveryActive, setHomeDeliveryActive] = useState(selectedBranch?.allow_home_delivery ?? true);
  const [codActive, setCodActive] = useState(selectedBranch?.payment_methods?.cod ?? (selectedBranch?.allow_cod ?? true));
  const [upiActive, setUpiActive] = useState(selectedBranch?.payment_methods?.upi ?? (selectedBranch?.allow_upi ?? true));

  // 3. Global Discount State
  const [discountActive, setDiscountActive] = useState(selectedBranch?.discount?.is_active ?? false);
  const [discountPercent, setDiscountPercent] = useState(String(selectedBranch?.discount?.percentage ?? 10));

  // 4. Order Automation
  const [autoAccept, setAutoAccept] = useState(user?.is_auto_accept ?? false);
  const [autoAcceptDelay, setAutoAcceptDelay] = useState(String(user?.auto_accept_duration ?? 5));
  const [autoReadyDuration, setAutoReadyDuration] = useState(String(user?.auto_ready_duration ?? 20));

  // 5. Charges Config State (Base & Free Delivery, Distance, Grouping, Happy Hours, Refund)
  const [baseDeliveryActive, setBaseDeliveryActive] = useState(true);
  const [baseDeliveryCharge, setBaseDeliveryCharge] = useState('30');
  const [freeDeliveryActive, setFreeDeliveryActive] = useState(false);
  const [freeDeliveryMinAmount, setFreeDeliveryMinAmount] = useState('500');

  const [extraKmActive, setExtraKmActive] = useState(true);
  const [extraKmThreshold, setExtraKmThreshold] = useState('3');
  const [extraKmCharge, setExtraKmCharge] = useState('10');

  const [orderGroupingRadius, setOrderGroupingRadius] = useState('2');

  const [happyHoursActive, setHappyHoursActive] = useState(false);
  const [happyHoursStart, setHappyHoursStart] = useState('12:00 PM');
  const [happyHoursEnd, setHappyHoursEnd] = useState('04:00 PM');
  const [happyHoursPercent, setHappyHoursPercent] = useState('15');

  const [refundActive, setRefundActive] = useState(true);
  const [refundPercent, setRefundPercent] = useState('100');

  // 6. Carousel Banners State
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  // Sync when selectedBranch changes
  useEffect(() => {
    if (selectedBranch) {
      const s = selectedBranch.shifts;
      setShiftsEnabled(s?.is_shifts_enabled ?? true);
      setMorningActive(s?.morning_shift?.is_active ?? true);
      setMorningStart(s?.morning_shift?.start_time ?? '11:00 AM');
      setMorningEnd(s?.morning_shift?.end_time ?? '03:30 PM');
      setNightActive(s?.night_shift?.is_active ?? true);
      setNightStart(s?.night_shift?.start_time ?? '07:00 PM');
      setNightEnd(s?.night_shift?.end_time ?? '11:30 PM');

      setHomeDeliveryActive(selectedBranch.allow_home_delivery ?? true);
      setCodActive(selectedBranch.payment_methods?.cod ?? (selectedBranch.allow_cod ?? true));
      setUpiActive(selectedBranch.payment_methods?.upi ?? (selectedBranch.allow_upi ?? true));

      setDiscountActive(selectedBranch.discount?.is_active ?? false);
      setDiscountPercent(String(selectedBranch.discount?.percentage ?? 10));

      loadChargesConfig(selectedBranch._id);
      loadCarouselBanners(selectedBranch._id);
    }
  }, [selectedBranch]);

  const loadChargesConfig = async (branchId) => {
    try {
      setLoadingConfig(true);
      const config = await settingsApi.getChargesConfig(branchId);
      if (config) {
        setBaseDeliveryActive(config.parcel_charges?.is_active ?? true);
        setBaseDeliveryCharge(String(config.parcel_charges?.charges ?? 30));

        setFreeDeliveryActive(config.free_delivery?.is_active ?? false);
        setFreeDeliveryMinAmount(String(config.free_delivery?.min_amount ?? 500));

        setExtraKmActive(config.delivery_extra_km?.is_active ?? true);
        setExtraKmThreshold(String(config.delivery_extra_km?.threshold_distance ?? 3));
        setExtraKmCharge(String(config.delivery_extra_km?.charge_per_km ?? 10));

        setOrderGroupingRadius(String(config.order_grouping_radius ?? 2));

        setHappyHoursActive(config.happy_hours?.is_active ?? false);
        setHappyHoursStart(config.happy_hours?.start_time ?? '12:00 PM');
        setHappyHoursEnd(config.happy_hours?.end_time ?? '04:00 PM');
        setHappyHoursPercent(String(config.happy_hours?.discount_number ?? 15));

        setRefundActive(config.refund?.is_active ?? true);
        setRefundPercent(String(config.refund?.refund_percent ?? 100));
      }
    } catch (err) {
      console.warn('Error loading charges config:', err);
    } finally {
      setLoadingConfig(false);
    }
  };

  const loadCarouselBanners = async (branchId) => {
    try {
      setLoadingBanners(true);
      const list = await settingsApi.getCarouselBanners(branchId);
      setBanners(list);
    } catch (err) {
      console.warn('Error loading banners:', err);
    } finally {
      setLoadingBanners(false);
    }
  };

  const handleAccordionChange = (sectionId) => (event, isExpanded) => {
    setExpandedSection(isExpanded ? sectionId : '');
  };

  // 1. Save Hotel Service Shifts
  const handleSaveShifts = async () => {
    if (!selectedBranch?._id) return;
    try {
      setSavingSection('shifts');
      const shiftsPayload = {
        is_shifts_enabled: shiftsEnabled,
        morning_shift: {
          is_active: morningActive,
          start_time: morningStart.trim(),
          end_time: morningEnd.trim(),
        },
        night_shift: {
          is_active: nightActive,
          start_time: nightStart.trim(),
          end_time: nightEnd.trim(),
        },
      };

      const res = await settingsApi.saveShifts(selectedBranch._id, shiftsPayload);
      if (res && res.success) {
        setSelectedBranch({ ...selectedBranch, shifts: shiftsPayload });
        showToast('Success', 'Hotel service shifts updated successfully.', 'success');
      }
    } catch (err) {
      console.error('Error saving shifts:', err);
      showToast('Error', err.message || 'Failed to update service shifts.', 'error');
    } finally {
      setSavingSection('');
    }
  };

  // 2. Toggle Home Delivery
  const handleToggleHomeDelivery = async (val) => {
    if (!selectedBranch?._id) return;
    try {
      setSavingSection('home_delivery');
      const res = await settingsApi.toggleHomeDelivery(selectedBranch._id, val);
      if (res && res.success) {
        setHomeDeliveryActive(val);
        setSelectedBranch({ ...selectedBranch, allow_home_delivery: val });
        showToast(
          'Home Delivery Updated',
          val ? 'Home delivery is now OPEN for customer orders.' : 'Home delivery is now CLOSED.',
          'success'
        );
      }
    } catch (err) {
      console.error('Error toggling home delivery:', err);
      showToast('Error', err.message || 'Failed to update delivery status.', 'error');
    } finally {
      setSavingSection('');
    }
  };

  // 3. Toggle Payment Methods
  const handleTogglePaymentMethod = async (type, val) => {
    if (!selectedBranch?._id) return;

    // Check that at least one method stays active
    if (!val && ((type === 'cod' && !upiActive) || (type === 'upi' && !codActive))) {
      showToast('Validation Error', 'At least one payment method (COD or UPI) must remain active.', 'warning');
      return;
    }

    const newCod = type === 'cod' ? val : codActive;
    const newUpi = type === 'upi' ? val : upiActive;

    try {
      setSavingSection('payments');
      const res = await settingsApi.togglePaymentMethods(selectedBranch._id, {
        cod: newCod,
        upi: newUpi,
      });

      if (res && res.success) {
        if (type === 'cod') setCodActive(val);
        if (type === 'upi') setUpiActive(val);
        setSelectedBranch({
          ...selectedBranch,
          payment_methods: { cod: newCod, upi: newUpi },
          allow_cod: newCod,
          allow_upi: newUpi,
        });
        showToast('Success', 'Payment methods updated successfully.', 'success');
      }
    } catch (err) {
      console.error('Error toggling payment methods:', err);
      showToast('Error', err.message || 'Failed to update payment methods.', 'error');
    } finally {
      setSavingSection('');
    }
  };

  // 4. Save Global Discount
  const handleSaveDiscount = async () => {
    if (!selectedBranch?._id) return;
    const pct = parseFloat(discountPercent);
    if (discountActive && (isNaN(pct) || pct <= 0 || pct > 100)) {
      showToast('Validation Error', 'Discount must be between 1 and 100%.', 'warning');
      return;
    }

    try {
      setSavingSection('discount');
      const payload = {
        is_active: discountActive,
        percentage: discountActive ? pct : 0,
      };

      const res = await settingsApi.saveDiscount(selectedBranch._id, payload);
      if (res && res.success) {
        setSelectedBranch({ ...selectedBranch, discount: payload });
        showToast(
          'Success',
          discountActive ? `Global discount of ${pct}% applied across all menu items!` : 'Global discount removed.',
          'success'
        );
      }
    } catch (err) {
      console.error('Error saving discount:', err);
      showToast('Error', err.message || 'Failed to update discount.', 'error');
    } finally {
      setSavingSection('');
    }
  };

  // 5. Save Order Automation
  const handleSaveAutomation = async () => {
    const delayNum = parseInt(autoAcceptDelay, 10);
    const readyNum = parseInt(autoReadyDuration, 10);

    if (autoAccept && (isNaN(delayNum) || delayNum < 0 || isNaN(readyNum) || readyNum < 0)) {
      showToast('Validation Error', 'Enter valid minutes for automation.', 'warning');
      return;
    }

    try {
      setSavingSection('automation');
      const payload = {
        is_auto_accept: autoAccept,
        auto_accept_duration: autoAccept ? delayNum : 5,
        auto_ready_duration: autoAccept ? readyNum : 20,
      };

      const res = await settingsApi.saveOrderAutomation(payload);
      if (res && res.success) {
        showToast('Success', 'Order automation settings saved successfully.', 'success');
      }
    } catch (err) {
      console.error('Error saving automation:', err);
      showToast('Error', err.message || 'Failed to update automation.', 'error');
    } finally {
      setSavingSection('');
    }
  };

  // 6. Save Delivery & Distance Charges
  const handleSaveDeliveryRules = async () => {
    if (!selectedBranch?._id) return;
    try {
      setSavingSection('delivery_charges');
      const payload = {
        branch_id: selectedBranch._id,
        parcel_charges: {
          is_active: baseDeliveryActive,
          charges: parseFloat(baseDeliveryCharge) || 0,
        },
        free_delivery: {
          is_active: freeDeliveryActive,
          min_amount: parseFloat(freeDeliveryMinAmount) || 0,
        },
        delivery_extra_km: {
          is_active: extraKmActive,
          threshold_distance: parseFloat(extraKmThreshold) || 3,
          charge_per_km: parseFloat(extraKmCharge) || 10,
        },
        order_grouping_radius: parseFloat(orderGroupingRadius) || 2,
        happy_hours: {
          is_active: happyHoursActive,
          start_time: happyHoursStart,
          end_time: happyHoursEnd,
          discount_type: 'percentage',
          discount_number: parseFloat(happyHoursPercent) || 0,
        },
        refund: {
          is_active: refundActive,
          refund_percent: parseFloat(refundPercent) || 100,
        },
      };

      const res = await settingsApi.saveChargesConfig(payload);
      if (res && res.success) {
        showToast('Success', 'Delivery & charges settings saved successfully.', 'success');
        loadChargesConfig(selectedBranch._id);
      }
    } catch (err) {
      console.error('Error saving delivery charges:', err);
      showToast('Error', err.message || 'Failed to update delivery rules.', 'error');
    } finally {
      setSavingSection('');
    }
  };

  // 7. Carousel Banners Upload & Delete
  const handleUploadBanner = async (file) => {
    if (!file || !selectedBranch?._id) return;
    try {
      setUploadingBanner(true);
      const res = await settingsApi.uploadCarouselBanner(selectedBranch._id, file);
      if (res && res.success) {
        showToast('Success', 'Carousel banner uploaded successfully!', 'success');
        loadCarouselBanners(selectedBranch._id);
      }
    } catch (err) {
      console.error('Error uploading banner:', err);
      showToast('Error', err.message || 'Failed to upload banner.', 'error');
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    try {
      const res = await settingsApi.deleteCarouselBanner(bannerId);
      if (res && res.success) {
        showToast('Deleted', 'Carousel banner removed.', 'success');
        setBanners((prev) => prev.filter((b) => (b._id || b.id) !== bannerId));
      }
    } catch (err) {
      console.error('Error deleting banner:', err);
      showToast('Error', err.message || 'Failed to delete banner.', 'error');
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 3 }, width: '100%' }}>
      {/* Title Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
            Store & Operations Settings
          </Typography>
          <Typography sx={{ fontSize: '13.5px', color: '#64748b' }}>
            Configure operational hours, delivery rules, payment modes, and store automation for <strong>{selectedBranch?.branch_name}</strong>.
          </Typography>
        </Box>
        <Chip
          icon={<Store size={14} color="#aa3bff" />}
          label={selectedBranch?.branch_name || 'Active Branch'}
          sx={{ fontWeight: 700, bgcolor: 'rgba(170, 59, 255, 0.08)', color: '#aa3bff', border: '1px solid rgba(170, 59, 255, 0.2)' }}
        />
      </Stack>

      <Stack spacing={2}>
        {/* ================================================================= */}
        {/* 1. HOTEL SERVICE SHIFTS                                           */}
        {/* ================================================================= */}
        <Accordion
          expanded={expandedSection === 'shifts'}
          onChange={handleAccordionChange('shifts')}
          sx={{ borderRadius: '12px !important', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ChevronDown size={18} />}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
              <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(170, 59, 255, 0.08)', color: '#aa3bff' }}>
                <Clock size={20} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
                  Hotel Service Shifts
                </Typography>
                <Typography sx={{ fontSize: '12.5px', color: '#64748b' }}>
                  {shiftsEnabled
                    ? `Morning: ${morningActive ? `${morningStart} - ${morningEnd}` : 'Off'} • Night: ${nightActive ? `${nightStart} - ${nightEnd}` : 'Off'}`
                    : 'Standard Continuous Hours (Shifts Disabled)'}
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 1, pb: 2.5, px: 3, borderTop: '1px solid #f1f5f9' }}>
            <Stack spacing={2.5}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                    Enable Shift Hours
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                    When enabled, menu ordering will only be available during defined shift windows.
                  </Typography>
                </Box>
                <Switch
                  checked={shiftsEnabled}
                  onChange={(e) => setShiftsEnabled(e.target.checked)}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#aa3bff' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#aa3bff' } }}
                />
              </Stack>

              {shiftsEnabled && (
                <Stack spacing={2}>
                  {/* Morning Shift */}
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: '10px', bgcolor: '#f8fafc' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Switch
                          size="small"
                          checked={morningActive}
                          onChange={(e) => setMorningActive(e.target.checked)}
                          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#16a34a' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' } }}
                        />
                        <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#334155' }}>
                          Morning Shift
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <TextField
                          size="small"
                          label="Start Time"
                          value={morningStart}
                          onChange={(e) => setMorningStart(e.target.value)}
                          disabled={!morningActive}
                          sx={{ width: 140 }}
                        />
                        <Typography sx={{ color: '#94a3b8' }}>to</Typography>
                        <TextField
                          size="small"
                          label="End Time"
                          value={morningEnd}
                          onChange={(e) => setMorningEnd(e.target.value)}
                          disabled={!morningActive}
                          sx={{ width: 140 }}
                        />
                      </Stack>
                    </Stack>
                  </Paper>

                  {/* Night Shift */}
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: '10px', bgcolor: '#f8fafc' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Switch
                          size="small"
                          checked={nightActive}
                          onChange={(e) => setNightActive(e.target.checked)}
                          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#16a34a' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' } }}
                        />
                        <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#334155' }}>
                          Night Shift
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <TextField
                          size="small"
                          label="Start Time"
                          value={nightStart}
                          onChange={(e) => setNightStart(e.target.value)}
                          disabled={!nightActive}
                          sx={{ width: 140 }}
                        />
                        <Typography sx={{ color: '#94a3b8' }}>to</Typography>
                        <TextField
                          size="small"
                          label="End Time"
                          value={nightEnd}
                          onChange={(e) => setNightEnd(e.target.value)}
                          disabled={!nightActive}
                          sx={{ width: 140 }}
                        />
                      </Stack>
                    </Stack>
                  </Paper>
                </Stack>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSaveShifts}
                  disabled={savingSection === 'shifts'}
                  startIcon={savingSection === 'shifts' ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
                  sx={{ textTransform: 'none', fontWeight: 700, background: 'linear-gradient(135deg, #aa3bff 0%, #7c3aed 100%)', borderRadius: '8px', px: 2.5 }}
                >
                  Save Shifts
                </Button>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ================================================================= */}
        {/* 2. HOME DELIVERY STATUS                                           */}
        {/* ================================================================= */}
        <Accordion
          expanded={expandedSection === 'home_delivery'}
          onChange={handleAccordionChange('home_delivery')}
          sx={{ borderRadius: '12px !important', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ChevronDown size={18} />}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
              <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(1, 135, 95, 0.08)', color: '#01875f' }}>
                <Truck size={20} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
                  Home Delivery Status
                </Typography>
                <Typography sx={{ fontSize: '12.5px', color: homeDeliveryActive ? '#16a34a' : '#ef4444', fontWeight: 600 }}>
                  {homeDeliveryActive ? '● Open • Accepting Delivery Orders' : '● Closed • Delivery Orders Suspended'}
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 1, pb: 2.5, px: 3, borderTop: '1px solid #f1f5f9' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                  Accept Home Delivery Orders
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                  Toggle off during peak kitchen rushes or bad weather to temporarily suspend new delivery orders.
                </Typography>
              </Box>
              <Switch
                checked={homeDeliveryActive}
                onChange={(e) => handleToggleHomeDelivery(e.target.checked)}
                disabled={savingSection === 'home_delivery'}
                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#16a34a' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ================================================================= */}
        {/* 3. PAYMENT METHODS                                                */}
        {/* ================================================================= */}
        <Accordion
          expanded={expandedSection === 'payments'}
          onChange={handleAccordionChange('payments')}
          sx={{ borderRadius: '12px !important', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ChevronDown size={18} />}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
              <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(2, 132, 199, 0.08)', color: '#0284c7' }}>
                <CreditCard size={20} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
                  Payment Methods
                </Typography>
                <Typography sx={{ fontSize: '12.5px', color: '#64748b' }}>
                  {codActive && upiActive ? 'COD & UPI Enabled' : codActive ? 'COD Only' : 'UPI Only'}
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 1, pb: 2.5, px: 3, borderTop: '1px solid #f1f5f9' }}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                    Cash on Delivery (COD)
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                    Allow customers to pay cash when food is delivered.
                  </Typography>
                </Box>
                <Switch
                  checked={codActive}
                  onChange={(e) => handleTogglePaymentMethod('cod', e.target.checked)}
                  disabled={savingSection === 'payments'}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0284c7' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#0284c7' } }}
                />
              </Stack>

              <Divider />

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                    Online Payment (UPI / Cards / NetBanking)
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                    Allow digital prepaid checkout through Razorpay / UPI.
                  </Typography>
                </Box>
                <Switch
                  checked={upiActive}
                  onChange={(e) => handleTogglePaymentMethod('upi', e.target.checked)}
                  disabled={savingSection === 'payments'}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0284c7' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#0284c7' } }}
                />
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ================================================================= */}
        {/* 4. GLOBAL BRANCH DISCOUNT                                         */}
        {/* ================================================================= */}
        <Accordion
          expanded={expandedSection === 'discount'}
          onChange={handleAccordionChange('discount')}
          sx={{ borderRadius: '12px !important', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ChevronDown size={18} />}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
              <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(236, 72, 153, 0.08)', color: '#ec4899' }}>
                <Percent size={20} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
                  Global Branch Discount
                </Typography>
                <Typography sx={{ fontSize: '12.5px', color: discountActive ? '#ec4899' : '#64748b', fontWeight: discountActive ? 700 : 400 }}>
                  {discountActive ? `${discountPercent}% Flat Discount Active on All Dishes` : 'No Store Discount Active'}
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 1, pb: 2.5, px: 3, borderTop: '1px solid #f1f5f9' }}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                    Enable Global Store Discount
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                    Applies automatically across all items in this branch.
                  </Typography>
                </Box>
                <Switch
                  checked={discountActive}
                  onChange={(e) => setDiscountActive(e.target.checked)}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#ec4899' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#ec4899' } }}
                />
              </Stack>

              {discountActive && (
                <TextField
                  label="Discount Percentage (%)"
                  type="number"
                  size="small"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                  inputProps={{ min: 1, max: 100 }}
                  sx={{ maxWidth: 220 }}
                />
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSaveDiscount}
                  disabled={savingSection === 'discount'}
                  startIcon={savingSection === 'discount' ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
                  sx={{ textTransform: 'none', fontWeight: 700, bgcolor: '#ec4899', borderRadius: '8px', px: 2.5, '&:hover': { bgcolor: '#db2777' } }}
                >
                  Save Discount
                </Button>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ================================================================= */}
        {/* 5. ORDER AUTOMATION                                               */}
        {/* ================================================================= */}
        <Accordion
          expanded={expandedSection === 'automation'}
          onChange={handleAccordionChange('automation')}
          sx={{ borderRadius: '12px !important', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ChevronDown size={18} />}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
              <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b' }}>
                <Bot size={20} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
                  Order Automation
                </Typography>
                <Typography sx={{ fontSize: '12.5px', color: '#64748b' }}>
                  {autoAccept ? `Auto-Accept ON (${autoAcceptDelay}m delay, ${autoReadyDuration}m prep)` : 'Manual Order Acceptance'}
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 1, pb: 2.5, px: 3, borderTop: '1px solid #f1f5f9' }}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                    Auto-Accept New Customer Orders
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                    Orders will automatically move to cooking status after the delay window.
                  </Typography>
                </Box>
                <Switch
                  checked={autoAccept}
                  onChange={(e) => setAutoAccept(e.target.checked)}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#f59e0b' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#f59e0b' } }}
                />
              </Stack>

              {autoAccept && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Auto-Accept Delay (mins)"
                    type="number"
                    size="small"
                    value={autoAcceptDelay}
                    onChange={(e) => setAutoAcceptDelay(e.target.value)}
                    InputProps={{ endAdornment: <InputAdornment position="end">min</InputAdornment> }}
                    inputProps={{ min: 1, max: 30 }}
                    fullWidth
                  />
                  <TextField
                    label="Default Kitchen Prep Duration (mins)"
                    type="number"
                    size="small"
                    value={autoReadyDuration}
                    onChange={(e) => setAutoReadyDuration(e.target.value)}
                    InputProps={{ endAdornment: <InputAdornment position="end">min</InputAdornment> }}
                    inputProps={{ min: 5, max: 90 }}
                    fullWidth
                  />
                </Stack>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSaveAutomation}
                  disabled={savingSection === 'automation'}
                  startIcon={savingSection === 'automation' ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
                  sx={{ textTransform: 'none', fontWeight: 700, bgcolor: '#f59e0b', borderRadius: '8px', px: 2.5, '&:hover': { bgcolor: '#d97706' } }}
                >
                  Save Automation
                </Button>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ================================================================= */}
        {/* 6. BASE & FREE DELIVERY + DISTANCE RULES                          */}
        {/* ================================================================= */}
        <Accordion
          expanded={expandedSection === 'delivery_charges'}
          onChange={handleAccordionChange('delivery_charges')}
          sx={{ borderRadius: '12px !important', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ChevronDown size={18} />}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
              <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10b981' }}>
                <MapPin size={20} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
                  Delivery Charges & Distance Rules
                </Typography>
                <Typography sx={{ fontSize: '12.5px', color: '#64748b' }}>
                  Base: ₹{baseDeliveryCharge} • Extra: ₹{extraKmCharge}/km after {extraKmThreshold}km • Free Delivery: {freeDeliveryActive ? `Orders above ₹${freeDeliveryMinAmount}` : 'Off'}
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 1, pb: 2.5, px: 3, borderTop: '1px solid #f1f5f9' }}>
            <Stack spacing={2.5}>
              {/* Base Parcel Charges */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                    Base Delivery Charge
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                    Standard charge applied to customer delivery orders within the base radius.
                  </Typography>
                </Box>
                <TextField
                  size="small"
                  type="number"
                  value={baseDeliveryCharge}
                  onChange={(e) => setBaseDeliveryCharge(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                  sx={{ width: 140 }}
                />
              </Stack>

              <Divider />

              {/* Free Delivery */}
              <Stack spacing={1.5}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                      Free Delivery Offer
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                      Waive delivery fee when order total exceeds threshold.
                    </Typography>
                  </Box>
                  <Switch
                    checked={freeDeliveryActive}
                    onChange={(e) => setFreeDeliveryActive(e.target.checked)}
                    sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' } }}
                  />
                </Stack>
                {freeDeliveryActive && (
                  <TextField
                    label="Minimum Order Total for Free Delivery"
                    size="small"
                    type="number"
                    value={freeDeliveryMinAmount}
                    onChange={(e) => setFreeDeliveryMinAmount(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    sx={{ maxWidth: 280 }}
                  />
                )}
              </Stack>

              <Divider />

              {/* Distance Charges */}
              <Stack spacing={1.5}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                  Extra Distance Mileage Charge
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Base Distance Radius"
                    size="small"
                    type="number"
                    value={extraKmThreshold}
                    onChange={(e) => setExtraKmThreshold(e.target.value)}
                    InputProps={{ endAdornment: <InputAdornment position="end">km</InputAdornment> }}
                    fullWidth
                  />
                  <TextField
                    label="Charge per Extra Km"
                    size="small"
                    type="number"
                    value={extraKmCharge}
                    onChange={(e) => setExtraKmCharge(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, endAdornment: <InputAdornment position="end">/ km</InputAdornment> }}
                    fullWidth
                  />
                </Stack>
              </Stack>

              <Divider />

              {/* Order Grouping Radius */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
                    Order Grouping Radius
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                    Radius to bundle nearby customer delivery stops to the same delivery boy.
                  </Typography>
                </Box>
                <TextField
                  size="small"
                  type="number"
                  value={orderGroupingRadius}
                  onChange={(e) => setOrderGroupingRadius(e.target.value)}
                  InputProps={{ endAdornment: <InputAdornment position="end">km</InputAdornment> }}
                  sx={{ width: 140 }}
                />
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSaveDeliveryRules}
                  disabled={savingSection === 'delivery_charges'}
                  startIcon={savingSection === 'delivery_charges' ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
                  sx={{ textTransform: 'none', fontWeight: 700, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '8px', px: 2.5 }}
                >
                  Save Delivery Rules
                </Button>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ================================================================= */}
        {/* 7. HOMEPAGE CAROUSEL BANNERS                                      */}
        {/* ================================================================= */}
        <Accordion
          expanded={expandedSection === 'carousel'}
          onChange={handleAccordionChange('carousel')}
          sx={{ borderRadius: '12px !important', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ChevronDown size={18} />}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
              <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(124, 58, 237, 0.08)', color: '#7c3aed' }}>
                <ImageIcon size={20} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
                  Homepage Carousel Banners
                </Typography>
                <Typography sx={{ fontSize: '12.5px', color: '#64748b' }}>
                  {banners.length} {banners.length === 1 ? 'banner image' : 'banner images'} active in customer mobile app
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 1, pb: 2.5, px: 3, borderTop: '1px solid #f1f5f9' }}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography sx={{ fontSize: '13px', color: '#64748b' }}>
                  Upload high-resolution promotional banners displayed at the top of the customer app home screen.
                </Typography>
                <Button
                  component="label"
                  variant="outlined"
                  size="small"
                  disabled={uploadingBanner}
                  startIcon={uploadingBanner ? <CircularProgress size={14} color="inherit" /> : <Upload size={14} />}
                  sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}
                >
                  {uploadingBanner ? 'Uploading...' : 'Upload Banner'}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadBanner(file);
                    }}
                  />
                </Button>
              </Stack>

              {loadingBanners ? (
                <Typography sx={{ fontSize: '13px', color: '#64748b', py: 2 }}>Loading banner images...</Typography>
              ) : banners.length === 0 ? (
                <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: '10px' }}>
                  <ImageIcon size={32} color="#94a3b8" style={{ marginBottom: 6 }} />
                  <Typography sx={{ fontSize: '13px', color: '#64748b' }}>No promotional banners currently uploaded.</Typography>
                </Paper>
              ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                  {banners.map((b) => {
                    const bannerId = b._id || b.id;
                    const uri = resolveImageUrl(b.image || b.url || b.banner_url);
                    return (
                      <Paper key={bannerId} variant="outlined" sx={{ borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                        <Box component="img" src={uri} alt="Banner" sx={{ width: '100%', height: 120, objectFit: 'cover' }} />
                        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', bgcolor: '#f8fafc' }}>
                          <IconButton size="small" color="error" onClick={() => handleDeleteBanner(bannerId)} title="Delete Banner">
                            <Trash2 size={16} />
                          </IconButton>
                        </Box>
                      </Paper>
                    );
                  })}
                </Box>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* ================================================================= */}
        {/* 8. ACCOUNT & SESSION                                              */}
        {/* ================================================================= */}
        <Accordion
          expanded={expandedSection === 'account'}
          onChange={handleAccordionChange('account')}
          sx={{ borderRadius: '12px !important', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ChevronDown size={18} />}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
              <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(15, 23, 42, 0.08)', color: '#0f172a' }}>
                <User size={20} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
                  Account & Profile
                </Typography>
                <Typography sx={{ fontSize: '12.5px', color: '#64748b' }}>
                  {user?.name || 'Manager'} • {user?.role_id === 0 ? 'Administrator (Role 0)' : 'Branch Manager (Role 1)'}
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 1, pb: 2.5, px: 3, borderTop: '1px solid #f1f5f9' }}>
            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: '10px', bgcolor: '#f8fafc' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      bgcolor: '#aa3bff',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      fontWeight: 800,
                    }}
                  >
                    {(user?.name || 'M').charAt(0).toUpperCase()}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
                      {user?.name || 'Restaurant Manager'}
                    </Typography>
                    <Typography sx={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                      <Phone size={13} /> {user?.phone || 'Mobile not set'}
                    </Typography>
                    <Typography sx={{ fontSize: '12.5px', color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                      <Store size={13} /> Assigned Branch: <strong>{selectedBranch?.branch_name}</strong>
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={onLogout}
                    startIcon={<LogOut size={16} />}
                    sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
                  >
                    Sign Out
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
}
