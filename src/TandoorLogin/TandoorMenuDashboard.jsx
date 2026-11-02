import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Chip,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Divider,
  Tooltip,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  ArrowLeft,
  Search,
  Plus,
  Edit2,
  Trash2,
  Percent,
  LogOut,
  ChefHat,
  Clock,
  Flame,
  Check,
  X,
  AlertTriangle,
  Upload,
  RefreshCw,
  Power,
  UtensilsCrossed,
  Image as ImageIcon,
  Settings as SettingsIcon,
} from 'lucide-react';
import TandoorSettingsView from './TandoorSettingsView';
import {
  authApi,
  branchApi,
  categoryApi,
  menuApi,
  resolveImageUrl,
} from './api';

const SPICE_OPTIONS = [
  { value: 'none', label: 'No Spice', icon: null, color: '#64748b' },
  { value: 'mild', label: 'Mild 🌶️', icon: null, color: '#eab308' },
  { value: 'medium', label: 'Medium 🌶️', icon: null, color: '#f97316' },
  { value: 'hot', label: 'Hot 🔥', icon: null, color: '#ef4444' },
  { value: 'extra_hot', label: 'Extra Hot 💥', icon: null, color: '#b91c1c' },
];

export default function TandoorMenuDashboard({ user, onLogout, showToast }) {
  // Branch state
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loadingBranches, setLoadingBranches] = useState(true);

  // Categories state
  const [categories, setCategories] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Menus state
  const [menus, setMenus] = useState([]);
  const [loadingMenus, setLoadingMenus] = useState(false);
  const [categoryStatus, setCategoryStatus] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Active view tab: 'menu' | 'settings'
  const [currentTab, setCurrentTab] = useState('menu');

  // Modals visibility
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [toggleCategoryModalOpen, setToggleCategoryModalOpen] = useState(false);

  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItemModalOpen, setDeleteItemModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [savingAction, setSavingAction] = useState(false);

  // Category Form State
  const [catNameEn, setCatNameEn] = useState('');
  const [catNameMr, setCatNameMr] = useState('');
  const [catIsActive, setCatIsActive] = useState(true);
  const [catImageFile, setCatImageFile] = useState(null);
  const [catImagePreview, setCatImagePreview] = useState('');
  const [catRemoveImage, setCatRemoveImage] = useState(false);

  // Menu Item Form State (Complete from mobile app)
  const [itemNameEn, setItemNameEn] = useState('');
  const [itemNameMr, setItemNameMr] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemDescEn, setItemDescEn] = useState('');
  const [itemDescMr, setItemDescMr] = useState('');
  const [itemIsVeg, setItemIsVeg] = useState(true);
  const [itemIsActive, setItemIsActive] = useState(true);
  const [itemPrepTime, setItemPrepTime] = useState('15');
  const [itemSpiceLevel, setItemSpiceLevel] = useState('none');
  const [itemCharges, setItemCharges] = useState([
    { size: 'Regular', price: '', discounted_price: '' },
  ]);
  const [itemImageFile, setItemImageFile] = useState(null);
  const [itemImagePreview, setItemImagePreview] = useState('');
  const [itemRemoveImage, setItemRemoveImage] = useState(false);

  // Global Discount Form State
  const [discountActive, setDiscountActive] = useState(false);
  const [discountPercent, setDiscountPercent] = useState('10');

  // 1. Fetch Branches on mount
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoadingBranches(true);
      const list = await branchApi.getBranches();
      let accessible = list;

      if (user?.role_id === 1) {
        const mgrBranchId = user.branch_id?._id || user.branch_id;
        if (mgrBranchId) {
          const match = list.find((b) => String(b._id) === String(mgrBranchId));
          if (match) accessible = [match];
        }
      }

      setBranches(accessible);

      if (accessible.length > 0) {
        const storedId = localStorage.getItem('branchId');
        const found = accessible.find((b) => b._id === storedId);
        const active = found || accessible[0];
        setSelectedBranch(active);
        localStorage.setItem('branchId', active._id);
        localStorage.setItem('branchName', active.branch_name || '');
      }
    } catch (err) {
      console.error('Error fetching branches:', err);
      showToast('Error', 'Failed to fetch restaurant branches.', 'error');
    } finally {
      setLoadingBranches(false);
    }
  };

  const handleBranchChange = (branchId) => {
    const found = branches.find((b) => b._id === branchId);
    if (found) {
      setSelectedBranch(found);
      localStorage.setItem('branchId', found._id);
      localStorage.setItem('branchName', found.branch_name || '');
      setSearchText('');
    }
  };

  // 2. Fetch Categories when selectedBranch changes
  useEffect(() => {
    if (selectedBranch?._id) {
      fetchCategories(selectedBranch._id);
    }
  }, [selectedBranch]);

  const fetchCategories = async (branchId) => {
    try {
      setLoadingCategories(true);
      const data = await categoryApi.getCategories(branchId);
      setCategories(data);

      if (data.length > 0) {
        const currentStillExists = data.some((c) => {
          const name = typeof c === 'string' ? c : c?.name;
          return name === selectedType;
        });

        if (!selectedType || !currentStillExists) {
          const first = data[0];
          const firstName = typeof first === 'string' ? first : first?.name || '';
          setSelectedType(firstName);
        }
      } else {
        setSelectedType('');
        setMenus([]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      showToast('Error', 'Failed to load categories.', 'error');
    } finally {
      setLoadingCategories(false);
    }
  };

  // 3. Fetch Menus for selected category or search
  useEffect(() => {
    if (!selectedBranch?._id) return;

    if (searchText.trim() !== '') {
      const timer = setTimeout(() => {
        searchMenuItems(selectedBranch._id, searchText.trim(), selectedType);
      }, 300);
      return () => clearTimeout(timer);
    } else if (selectedType) {
      fetchMenusForType(selectedBranch._id, selectedType);
    }
  }, [selectedBranch, selectedType, searchText]);

  const fetchMenusForType = async (branchId, typeName) => {
    try {
      setLoadingMenus(true);
      const res = await menuApi.getMenusByType(branchId, typeName, 1, 100);
      if (res && res.success && Array.isArray(res.data)) {
        setMenus(res.data);
        if (res.categoryStatus) {
          setCategoryStatus(res.categoryStatus);
        } else {
          const total = res.data.length;
          const activeCount = res.data.filter((m) => m.isactive).length;
          const isOff = total > 0 && activeCount === 0;
          setCategoryStatus({
            type: typeName,
            totalCount: total,
            activeCount,
            inactiveCount: total - activeCount,
            isCategoryOff: isOff,
            is_active: !isOff,
          });
        }
      }
    } catch (err) {
      console.error('Error fetching menus:', err);
      showToast('Error', 'Failed to load menu items.', 'error');
    } finally {
      setLoadingMenus(false);
    }
  };

  const searchMenuItems = async (branchId, query, typeName) => {
    try {
      setLoadingMenus(true);
      const res = await menuApi.searchMenus(branchId, query, typeName, 1, 100);
      if (res && res.success && Array.isArray(res.data)) {
        setMenus(res.data);
      }
    } catch (err) {
      console.error('Search error:', err);
      showToast('Search Failed', 'Could not complete item search.', 'error');
    } finally {
      setLoadingMenus(false);
    }
  };

  const isCurrentCategoryOff = useMemo(() => {
    if (
      categoryStatus &&
      categoryStatus.type === selectedType &&
      typeof categoryStatus.isCategoryOff === 'boolean'
    ) {
      return categoryStatus.isCategoryOff;
    }
    const matched = categories.find((c) => {
      const name = typeof c === 'string' ? c : c?.name;
      return name === selectedType;
    });
    if (matched && typeof matched !== 'string' && matched?.is_active === false) {
      return true;
    }
    if (menus.length > 0) {
      return menus.every((m) => !m.isactive);
    }
    return false;
  }, [categoryStatus, selectedType, categories, menus]);

  const currentCategoryObj = useMemo(() => {
    return categories.find((c) => {
      const name = typeof c === 'string' ? c : c?.name;
      return name === selectedType;
    });
  }, [categories, selectedType]);

  // CATEGORY OPERATIONS
  const openCreateCategoryModal = () => {
    setEditingCategory(null);
    setCatNameEn('');
    setCatNameMr('');
    setCatIsActive(true);
    setCatImageFile(null);
    setCatImagePreview('');
    setCatRemoveImage(false);
    setCategoryModalOpen(true);
  };

  const openEditCategoryModal = () => {
    if (!currentCategoryObj) return;
    setEditingCategory(currentCategoryObj);
    const nameStr =
      typeof currentCategoryObj === 'string'
        ? currentCategoryObj
        : currentCategoryObj.name_en || currentCategoryObj.name || '';
    const nameMrStr =
      typeof currentCategoryObj === 'string'
        ? ''
        : currentCategoryObj.name_mr || currentCategoryObj.languages?.mr?.name || '';
    const activeVal =
      typeof currentCategoryObj === 'string'
        ? !isCurrentCategoryOff
        : currentCategoryObj.is_active !== undefined
        ? currentCategoryObj.is_active
        : !isCurrentCategoryOff;

    setCatNameEn(nameStr);
    setCatNameMr(nameMrStr);
    setCatIsActive(activeVal);
    setCatImageFile(null);
    setCatImagePreview(
      typeof currentCategoryObj !== 'string' && currentCategoryObj.image
        ? resolveImageUrl(currentCategoryObj.image)
        : ''
    );
    setCatRemoveImage(false);
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!catNameEn.trim()) {
      showToast('Validation Error', 'Category name is required.', 'warning');
      return;
    }
    if (!selectedBranch?._id) return;

    try {
      setSavingAction(true);
      if (editingCategory) {
        const catId = editingCategory._id || editingCategory;
        const res = await categoryApi.updateCategory(catId, {
          branchId: selectedBranch._id,
          name: catNameEn,
          name_mr: catNameMr,
          is_active: catIsActive,
          imageFile: catImageFile,
          removeImage: catRemoveImage,
        });

        if (res && res.success) {
          showToast('Success', `Category "${catNameEn}" updated successfully.`, 'success');
          setSelectedType(catNameEn.trim());
          setCategoryModalOpen(false);
          await fetchCategories(selectedBranch._id);
          await fetchMenusForType(selectedBranch._id, catNameEn.trim());
        }
      } else {
        const res = await categoryApi.createCategory({
          branchId: selectedBranch._id,
          name: catNameEn,
          name_mr: catNameMr,
          is_active: catIsActive,
          imageFile: catImageFile,
        });

        if (res && res.success) {
          showToast('Success', `Category "${catNameEn}" created successfully!`, 'success');
          setSelectedType(catNameEn.trim());
          setCategoryModalOpen(false);
          await fetchCategories(selectedBranch._id);
        }
      }
    } catch (err) {
      console.error('Error saving category:', err);
      showToast('Save Failed', err.message || 'Unable to save category.', 'error');
    } finally {
      setSavingAction(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!editingCategory || !selectedBranch?._id) return;
    const catId = editingCategory._id || editingCategory;
    const catName =
      typeof editingCategory === 'string' ? editingCategory : editingCategory.name;

    try {
      setSavingAction(true);
      const res = await categoryApi.deleteCategory(catId, selectedBranch._id);
      if (res && res.success) {
        showToast('Deleted', `Category "${catName}" and items deleted.`, 'success');
        setDeleteCategoryModalOpen(false);
        setCategoryModalOpen(false);
        setSelectedType('');
        await fetchCategories(selectedBranch._id);
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      showToast('Delete Failed', err.message || 'Could not delete category.', 'error');
    } finally {
      setSavingAction(false);
    }
  };

  const handleConfirmToggleCategory = async () => {
    if (!selectedBranch?._id || !selectedType) return;
    const willTurnOn = isCurrentCategoryOff;

    try {
      setSavingAction(true);
      setMenus((prev) => prev.map((m) => ({ ...m, isactive: willTurnOn })));
      setCategoryStatus((prev) =>
        prev
          ? {
              ...prev,
              isCategoryOff: !willTurnOn,
              is_active: willTurnOn,
              activeCount: willTurnOn ? prev.totalCount : 0,
              inactiveCount: willTurnOn ? 0 : prev.totalCount,
            }
          : null
      );

      const res = await categoryApi.toggleCategoryMenu(
        selectedBranch._id,
        selectedType,
        willTurnOn
      );

      if (res && res.success) {
        showToast(
          'Menu Status Updated',
          willTurnOn
            ? `"${selectedType}" menu turned ON. All items are now active.`
            : `"${selectedType}" menu turned OFF. Items marked inactive.`,
          'success'
        );
        setToggleCategoryModalOpen(false);
        await fetchMenusForType(selectedBranch._id, selectedType);
      }
    } catch (err) {
      console.error('Error toggling category menu:', err);
      showToast('Toggle Failed', err.message || 'Could not toggle menu status.', 'error');
      await fetchMenusForType(selectedBranch._id, selectedType);
    } finally {
      setSavingAction(false);
    }
  };

  // MENU ITEMS OPERATIONS
  const openCreateItemModal = () => {
    setEditingItem(null);
    setItemNameEn('');
    setItemNameMr('');
    setItemCategory(selectedType || (categories[0]?.name || categories[0] || ''));
    setItemDescEn('');
    setItemDescMr('');
    setItemIsVeg(true);
    setItemIsActive(true);
    setItemPrepTime('15');
    setItemSpiceLevel('none');
    setItemCharges([{ size: 'Regular', price: '', discounted_price: '' }]);
    setItemImageFile(null);
    setItemImagePreview('');
    setItemRemoveImage(false);
    setItemModalOpen(true);
  };

  const openEditItemModal = (item) => {
    setEditingItem(item);
    setItemNameEn(item.name_en || item.name || '');
    setItemNameMr(item.name_mr || item.languages?.mr?.name || '');
    setItemCategory(item.type || selectedType);
    setItemDescEn(item.description_en || item.description || '');
    setItemDescMr(item.description_mr || item.languages?.mr?.description || '');
    setItemIsVeg(item.isveg !== false);
    setItemIsActive(item.isactive !== false);
    setItemPrepTime(item.preparation_time ? String(item.preparation_time) : '15');
    setItemSpiceLevel(item.spice_level || 'none');

    const mappedCharges =
      item.charges && item.charges.length > 0
        ? item.charges.map((c) => ({
            size: c.size,
            price: String(c.original_price ?? c.price ?? ''),
            discounted_price:
              c.discounted_price !== undefined &&
              c.discounted_price !== null &&
              Number(c.discounted_price) < Number(c.original_price ?? c.price)
                ? String(c.discounted_price)
                : '',
          }))
        : [{ size: 'Regular', price: '', discounted_price: '' }];

    setItemCharges(mappedCharges);
    setItemImageFile(null);
    setItemRemoveImage(false);
    setItemImagePreview(
      item.images && item.images.length > 0 ? resolveImageUrl(item.images[0]) : ''
    );
    setItemModalOpen(true);
  };

  const handleChargeChange = (index, field, value) => {
    setItemCharges((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddChargeSize = () => {
    setItemCharges((prev) => [...prev, { size: '', price: '', discounted_price: '' }]);
  };

  const handleRemoveChargeSize = (index) => {
    if (itemCharges.length <= 1) {
      showToast('Validation Note', 'Item must have at least one portion size.', 'warning');
      return;
    }
    setItemCharges((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveMenuItem = async (e) => {
    e.preventDefault();
    if (!selectedBranch?._id) return;

    if (!itemNameEn.trim()) {
      showToast('Validation Error', 'Dish name in English is required.', 'warning');
      return;
    }

    const validCharges = itemCharges.filter(
      (c) => c.size.trim() !== '' && c.price.trim() !== ''
    );
    if (validCharges.length === 0) {
      showToast('Validation Error', 'Provide at least one portion size and price.', 'warning');
      return;
    }

    const formattedCharges = validCharges.map((c) => {
      const p = parseFloat(c.price);
      const obj = { size: c.size.trim(), price: p };
      if (c.discounted_price && c.discounted_price.trim() !== '') {
        const dp = parseFloat(c.discounted_price.trim());
        if (!isNaN(dp) && dp > 0 && dp < p) {
          obj.discounted_price = dp;
        }
      }
      return obj;
    });

    for (const c of formattedCharges) {
      if (isNaN(c.price) || c.price < 0) {
        showToast('Validation Error', 'Dish price must be a valid positive number.', 'warning');
        return;
      }
    }

    const payload = {
      name: itemNameEn.trim(),
      name_mr: itemNameMr.trim(),
      description: itemDescEn.trim(),
      description_mr: itemDescMr.trim(),
      type: itemCategory || selectedType,
      isveg: itemIsVeg,
      isactive: itemIsActive,
      preparation_time: parseInt(itemPrepTime, 10) || 15,
      spice_level: itemSpiceLevel,
      charges: formattedCharges,
      imageFile: itemImageFile,
      removeImage: itemRemoveImage,
      existingImages: !itemRemoveImage && editingItem?.images ? editingItem.images : [],
    };

    try {
      setSavingAction(true);
      if (editingItem) {
        const res = await menuApi.updateMenuItem(
          editingItem._id,
          selectedBranch._id,
          payload
        );
        if (res && res.success) {
          showToast('Updated', `"${itemNameEn}" details updated.`, 'success');
          setItemModalOpen(false);
          await fetchMenusForType(selectedBranch._id, selectedType);
        }
      } else {
        const res = await menuApi.createMenuItem(selectedBranch._id, payload);
        if (res && res.success) {
          showToast('Created', `"${itemNameEn}" added to menu catalog!`, 'success');
          setItemModalOpen(false);
          await fetchMenusForType(selectedBranch._id, selectedType);
        }
      }
    } catch (err) {
      console.error('Error saving item:', err);
      showToast('Save Failed', err.message || 'Could not save menu item.', 'error');
    } finally {
      setSavingAction(false);
    }
  };

  const handleToggleItemAvailability = async (item) => {
    if (!selectedBranch?._id) return;
    const original = item.isactive;
    const newVal = !original;

    setMenus((prev) =>
      prev.map((m) => (m._id === item._id ? { ...m, isactive: newVal } : m))
    );

    try {
      await menuApi.toggleAvailability(item._id, selectedBranch._id, newVal);
      showToast(
        newVal ? 'Item Available' : 'Item Marked Sold Out',
        `"${item.name}" is now ${newVal ? 'Active' : 'Unavailable'} for orders.`,
        'success'
      );
    } catch (err) {
      console.error('Error toggling availability:', err);
      setMenus((prev) =>
        prev.map((m) => (m._id === item._id ? { ...m, isactive: original } : m))
      );
      showToast('Update Failed', 'Failed to update item availability.', 'error');
    }
  };

  const confirmDeleteItem = (item) => {
    setItemToDelete(item);
    setDeleteItemModalOpen(true);
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete || !selectedBranch?._id) return;

    try {
      setSavingAction(true);
      const res = await menuApi.deleteMenuItem(itemToDelete._id, selectedBranch._id);
      if (res && res.success) {
        showToast('Deleted', `"${itemToDelete.name}" removed from catalog.`, 'success');
        setDeleteItemModalOpen(false);
        setItemToDelete(null);
        await fetchMenusForType(selectedBranch._id, selectedType);
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      showToast('Delete Failed', err.message || 'Could not delete item.', 'error');
    } finally {
      setSavingAction(false);
    }
  };

  // GLOBAL DISCOUNT OPERATIONS
  const openGlobalDiscountModal = () => {
    if (!selectedBranch) return;
    const curActive = selectedBranch.discount?.is_active ?? false;
    const curPct = selectedBranch.discount?.percentage ?? 10;
    setDiscountActive(curActive);
    setDiscountPercent(String(curPct > 0 ? curPct : 10));
    setDiscountModalOpen(true);
  };

  const handleSaveDiscount = async (e) => {
    e.preventDefault();
    if (!selectedBranch?._id) return;

    const pctNum = parseFloat(discountPercent);
    if (discountActive && (isNaN(pctNum) || pctNum <= 0 || pctNum > 100)) {
      showToast('Validation Error', 'Discount must be between 1 and 100%.', 'warning');
      return;
    }

    try {
      setSavingAction(true);
      const payload = {
        is_active: discountActive,
        percentage: discountActive ? pctNum : 0,
      };

      const res = await branchApi.updateBranchDiscount(selectedBranch._id, payload);
      if (res && res.success) {
        setSelectedBranch((prev) => ({
          ...prev,
          discount: payload,
        }));
        setDiscountModalOpen(false);
        showToast(
          'Discount Updated',
          discountActive
            ? `Global discount of ${pctNum}% applied across all dishes!`
            : 'Global discount deactivated. Standard menu pricing active.',
          'success'
        );
        if (selectedType) {
          fetchMenusForType(selectedBranch._id, selectedType);
        }
      }
    } catch (err) {
      console.error('Error saving discount:', err);
      showToast('Discount Error', err.message || 'Could not update discount.', 'error');
    } finally {
      setSavingAction(false);
    }
  };

  const hasActiveDiscount =
    selectedBranch?.discount?.is_active && selectedBranch?.discount?.percentage > 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Bar */}
      <Paper
        elevation={0}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #e2e8f0',
          py: 1.25,
          px: { xs: 2, md: 3 },
          boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
        }}
      >
        <Stack spacing={1.25} sx={{ maxWidth: 1600, mx: 'auto' }}>
          {/* Main Top Row: Brand + Segmented Nav + User Profile */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'stretch', md: 'center' }}
            justifyContent="space-between"
            spacing={1.5}
          >
            {/* Left: Back + Brand */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexShrink: 0 }}>
              <Button
                component={Link}
                to="/homedelivery"
                size="small"
                startIcon={<ArrowLeft size={14} />}
                sx={{
                  color: '#475569',
                  bgcolor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '12px',
                  px: 1.25,
                  py: 0.5,
                  '&:hover': { bgcolor: '#e2e8f0', color: '#0f172a' },
                }}
              >
                Dhion
              </Button>

              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Box
                  component="img"
                  src="/tandoor/Tandoor_Corner.png"
                  alt="Hotel Tandoor Corner"
                  sx={{
                    width: 36,
                    height: 36,
                    objectFit: 'contain',
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <Box>
                  <Typography sx={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', lineHeight: 1.15 }}>
                    Hotel Tandoor Corner
                  </Typography>
                  <Typography sx={{ fontSize: '10.5px', fontWeight: 700, color: '#aa3bff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    Restaurant Manager Portal
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            {/* Center: Segmented Navigation (Menu & Dishes vs Settings) */}
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                bgcolor: '#f1f5f9',
                p: '3px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                alignSelf: { xs: 'center', md: 'center' },
              }}
            >
              <Button
                size="small"
                onClick={() => setCurrentTab('menu')}
                startIcon={<UtensilsCrossed size={14} />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  borderRadius: '9px',
                  py: 0.6,
                  px: 1.75,
                  bgcolor: currentTab === 'menu' ? '#ffffff' : 'transparent',
                  color: currentTab === 'menu' ? '#aa3bff' : '#64748b',
                  boxShadow: currentTab === 'menu' ? '0 2px 6px rgba(170, 59, 255, 0.15)' : 'none',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: currentTab === 'menu' ? '#ffffff' : '#e2e8f0',
                  },
                }}
              >
                Menu & Dishes
              </Button>
              <Button
                size="small"
                onClick={() => setCurrentTab('settings')}
                startIcon={<SettingsIcon size={14} />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  borderRadius: '9px',
                  py: 0.6,
                  px: 1.75,
                  bgcolor: currentTab === 'settings' ? '#ffffff' : 'transparent',
                  color: currentTab === 'settings' ? '#aa3bff' : '#64748b',
                  boxShadow: currentTab === 'settings' ? '0 2px 6px rgba(170, 59, 255, 0.15)' : 'none',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: currentTab === 'settings' ? '#ffffff' : '#e2e8f0',
                  },
                }}
              >
                Settings
              </Button>
            </Stack>

            {/* Right: Branch Selector + Profile + Sign Out */}
            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ justifyContent: { xs: 'space-between', md: 'flex-end' } }}>
              <Select
                size="small"
                value={selectedBranch?._id || ''}
                onChange={(e) => handleBranchChange(e.target.value)}
                disabled={loadingBranches || branches.length <= 1}
                sx={{
                  minWidth: 150,
                  bgcolor: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
                }}
              >
                {branches.map((b) => (
                  <MenuItem key={b._id} value={b._id}>
                    {b.branch_name} {b.branch_code ? `(${b.branch_code})` : ''}
                  </MenuItem>
                ))}
              </Select>

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  bgcolor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '999px',
                  py: 0.4,
                  pl: 0.5,
                  pr: 1.25,
                }}
              >
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    bgcolor: '#aa3bff',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 800,
                  }}
                >
                  {(user?.name || 'M').charAt(0).toUpperCase()}
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography sx={{ fontSize: '11.5px', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
                    {user?.name || 'Manager'}
                  </Typography>
                  <Typography sx={{ fontSize: '10px', color: '#64748b' }}>
                    {user?.role_id === 0 ? 'Admin' : 'Manager'}
                  </Typography>
                </Box>
              </Stack>

              <IconButton
                size="small"
                onClick={onLogout}
                sx={{
                  bgcolor: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fee2e2',
                  borderRadius: '9px',
                  p: 0.85,
                  '&:hover': { bgcolor: '#dc2626', color: '#fff' },
                }}
                title="Sign Out"
              >
                <LogOut size={15} />
              </IconButton>
            </Stack>
          </Stack>

          {/* Sub Row (Only on Menu Tab): Search Bar + Global Discount */}
          {currentTab === 'menu' && (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems="center"
              justifyContent="space-between"
              spacing={1.5}
              sx={{ pt: 0.25 }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Search dishes by name or Marathi..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={15} color="#94a3b8" />
                    </InputAdornment>
                  ),
                  endAdornment: searchText ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchText('')}>
                        <X size={14} />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
                sx={{
                  maxWidth: { sm: 460 },
                  bgcolor: '#f8fafc',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    '& fieldset': { borderColor: '#e2e8f0' },
                    '&:hover fieldset': { borderColor: '#cbd5e1' },
                    '&.Mui-focused fieldset': { borderColor: '#aa3bff' },
                  },
                }}
              />

              <Button
                variant={hasActiveDiscount ? 'contained' : 'outlined'}
                size="small"
                startIcon={<Percent size={14} />}
                onClick={openGlobalDiscountModal}
                sx={{
                  whiteSpace: 'nowrap',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '12px',
                  borderRadius: '10px',
                  py: 0.65,
                  px: 1.75,
                  ...(hasActiveDiscount
                    ? {
                        background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
                        color: '#ffffff',
                        boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #e11d48 0%, #db2777 100%)',
                        },
                      }
                    : {
                        color: '#be185d',
                        bgcolor: '#fdf2f8',
                        borderColor: '#fbcfe8',
                        '&:hover': {
                          bgcolor: '#fce7f3',
                          borderColor: '#f472b6',
                        },
                      }),
                }}
              >
                {hasActiveDiscount
                  ? `${selectedBranch.discount.percentage}% OFF Branch Discount Active`
                  : 'Set Global Branch Discount'}
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto', width: '100%' }}>
        {currentTab === 'settings' ? (
          <TandoorSettingsView
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            user={user}
            onLogout={onLogout}
            showToast={showToast}
          />
        ) : (
          <>
            {/* Category (Types) Section */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2.5,
                borderRadius: '16px',
                bgcolor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
              }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-between"
                spacing={1.5}
                sx={{ mb: 1.5 }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                    Menu Categories
                  </Typography>
                  <Chip
                    label={`${categories.length} categories`}
                    size="small"
                    sx={{
                      fontSize: '11px',
                      fontWeight: 700,
                      bgcolor: '#f1f5f9',
                      color: '#475569',
                      height: 22,
                    }}
                  />
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                  {/* Category Status Switch */}
                  {selectedType && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{
                        bgcolor: isCurrentCategoryOff ? '#fef2f2' : '#f0fdf4',
                        border: '1px solid',
                        borderColor: isCurrentCategoryOff ? '#fee2e2' : '#dcfce7',
                        borderRadius: '999px',
                        py: 0.25,
                        px: 1.25,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: isCurrentCategoryOff ? '#dc2626' : '#16a34a',
                        }}
                      >
                        Category: {isCurrentCategoryOff ? 'OFF (Hidden)' : 'ON (Live)'}
                      </Typography>
                      <Switch
                        size="small"
                        checked={!isCurrentCategoryOff}
                        onChange={() => setToggleCategoryModalOpen(true)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#16a34a' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#16a34a' },
                          transform: 'scale(0.85)',
                          m: -0.5,
                        }}
                      />
                    </Stack>
                  )}

                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Edit2 size={13} />}
                    onClick={openEditCategoryModal}
                    disabled={!selectedType || loadingCategories}
                    sx={{
                      textTransform: 'none',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '9px',
                      borderColor: '#cbd5e1',
                      color: '#334155',
                      py: 0.5,
                      px: 1.25,
                      '&:hover': { bgcolor: '#f8fafc', borderColor: '#94a3b8' },
                    }}
                  >
                    Edit Category
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Plus size={14} />}
                    onClick={openCreateCategoryModal}
                    sx={{
                      textTransform: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      borderRadius: '9px',
                      py: 0.5,
                      px: 1.5,
                      background: 'linear-gradient(135deg, #aa3bff 0%, #7c3aed 100%)',
                      boxShadow: '0 4px 12px rgba(170, 59, 255, 0.25)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #9333ea 0%, #6d28d9 100%)',
                      },
                    }}
                  >
                    Add Category
                  </Button>
                </Stack>
              </Stack>

              {/* Category Horizontal Pills */}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  overflowX: 'auto',
                  pb: 0.75,
                  pt: 0.25,
                  '::-webkit-scrollbar': { height: '5px' },
                  '::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: '4px' },
                }}
              >
                {loadingCategories ? (
                  <Typography sx={{ color: '#64748b', fontSize: '13px', py: 0.5 }}>
                    Loading categories...
                  </Typography>
                ) : categories.length === 0 ? (
                  <Typography sx={{ color: '#94a3b8', fontSize: '13px', py: 0.5 }}>
                    No categories found. Click "+ Add Category" to create your first one.
                  </Typography>
                ) : (
                  categories.map((cat, idx) => {
                    const name = typeof cat === 'string' ? cat : cat.name;
                    const nameMr = typeof cat === 'string' ? '' : cat.name_mr;
                    const isSelected = name === selectedType;
                    const iconUri = typeof cat !== 'string' && cat.image ? resolveImageUrl(cat.image) : '';
                    const isActive = typeof cat === 'string' ? true : cat.is_active !== false;

                    return (
                      <Chip
                        key={cat._id || idx}
                        clickable
                        onClick={() => {
                          setSelectedType(name);
                          setSearchText('');
                        }}
                        avatar={
                          iconUri ? (
                            <Box
                              component="img"
                              src={iconUri}
                              alt={name}
                              sx={{ width: 20, height: 20, borderRadius: '6px', objectFit: 'cover' }}
                            />
                          ) : (
                            <UtensilsCrossed size={14} color={isSelected ? '#ffffff' : '#aa3bff'} />
                          )
                        }
                        label={
                          <Stack direction="row" alignItems="center" spacing={0.75}>
                            <Typography sx={{ fontSize: '12.5px', fontWeight: isSelected ? 800 : 600 }}>
                              {name}
                            </Typography>
                            {nameMr && (
                              <Typography sx={{ fontSize: '11px', opacity: isSelected ? 0.9 : 0.65 }}>
                                ({nameMr})
                              </Typography>
                            )}
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: isSelected ? '#ffffff' : isActive ? '#10b981' : '#94a3b8',
                                boxShadow: isSelected ? '0 0 6px rgba(255,255,255,0.8)' : 'none',
                              }}
                            />
                          </Stack>
                        }
                        sx={{
                          borderRadius: '12px',
                          px: 1.25,
                          py: 2.25,
                          transition: 'all 0.18s ease',
                          ...(isSelected
                            ? {
                                background: 'linear-gradient(135deg, #aa3bff 0%, #7c3aed 100%)',
                                color: '#ffffff',
                                boxShadow: '0 4px 14px rgba(170, 59, 255, 0.3)',
                                border: '1px solid transparent',
                              }
                            : {
                                bgcolor: '#f8fafc',
                                color: '#1e293b',
                                border: '1px solid #e2e8f0',
                                '&:hover': {
                                  bgcolor: '#f1f5f9',
                                  borderColor: '#aa3bff',
                                  color: '#aa3bff',
                                  transform: 'translateY(-1px)',
                                },
                              }),
                        }}
                      />
                    );
                  })
                )}
              </Stack>
            </Paper>

        {/* Menu Items Header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
              {selectedType ? `${selectedType} Menu` : 'All Dishes'}
              {categoryStatus?.totalCount !== undefined && (
                <Typography component="span" sx={{ fontSize: '13px', fontWeight: 600, color: '#64748b', ml: 1 }}>
                  ({categoryStatus.activeCount || 0} active, {categoryStatus.inactiveCount || 0} sold out)
                </Typography>
              )}
            </Typography>
            {isCurrentCategoryOff && (
              <Typography sx={{ fontSize: '11.5px', color: '#ef4444', fontWeight: 700, mt: 0.25 }}>
                &bull; Notice: This category is turned OFF. Dishes are hidden from customers on the app.
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            size="small"
            startIcon={<Plus size={15} />}
            onClick={openCreateItemModal}
            sx={{
              textTransform: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              borderRadius: '9px',
              py: 0.65,
              px: 1.75,
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
              '&:hover': {
                background: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
              },
            }}
          >
            Add Menu Dish
          </Button>
        </Stack>

        {/* Menu Items Grid: 6 CARDS PER LINE ON DESKTOP */}
        {loadingMenus ? (
          <Box sx={{ textAlign: 'center', py: 8, color: '#64748b' }}>
            <CircularProgress size={30} sx={{ color: '#aa3bff', mb: 1.5 }} />
            <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>Loading menu items...</Typography>
          </Box>
        ) : menus.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              textAlign: 'center',
              py: 7,
              px: 3,
              borderRadius: '16px',
              borderStyle: 'dashed',
              borderColor: '#cbd5e1',
              bgcolor: '#ffffff',
            }}
          >
            <ChefHat size={40} color="#94a3b8" style={{ marginBottom: 10 }} />
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
              {searchText ? 'No Matching Dishes Found' : 'No Dishes in this Category Yet'}
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#64748b', mb: 2.5, maxWidth: 400, mx: 'auto' }}>
              {searchText
                ? `No dishes match "${searchText}". Try a different keyword.`
                : 'Click below to create your first delicious menu item with portion sizes and prices.'}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Plus size={15} />}
              onClick={openCreateItemModal}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
              }}
            >
              Add First Dish
            </Button>
          </Paper>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(6, 1fr)',
                xl: 'repeat(6, 1fr)',
                '@media (min-width: 1024px)': {
                  gridTemplateColumns: 'repeat(6, 1fr)',
                },
              },
              gap: 1.75,
            }}
          >
            {menus.map((item) => {
              const imgUri =
                item.images && item.images.length > 0
                  ? resolveImageUrl(item.images[0])
                  : '';
              const isVeg = item.isveg !== false;
              const isItemActive = item.isactive !== false;

              return (
                <Card
                  key={item._id}
                  elevation={0}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isItemActive ? 1 : 0.68,
                    bgcolor: '#ffffff',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(170, 59, 255, 0.08)',
                      borderColor: '#cbd5e1',
                    },
                  }}
                  onClick={() => openEditItemModal(item)}
                >
                  {/* Dish Image Box */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 120,
                      bgcolor: '#0f172a',
                      overflow: 'hidden',
                    }}
                  >
                    {imgUri ? (
                      <CardMedia
                        component="img"
                        image={imgUri}
                        alt={item.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                          '&:hover': {
                            transform: 'scale(1.06)',
                          },
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: '#f1f5f9',
                          color: '#94a3b8',
                        }}
                      >
                        <ChefHat size={34} />
                      </Box>
                    )}

                    {/* Gradient overlay for badge readability */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.45) 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Veg / Non-Veg Indicator */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 7,
                        left: 7,
                        width: 17,
                        height: 17,
                        borderRadius: '4px',
                        border: `1.5px solid ${isVeg ? '#16a34a' : '#dc2626'}`,
                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: isVeg ? '50%' : '1px',
                          bgcolor: isVeg ? '#16a34a' : '#dc2626',
                        }}
                      />
                    </Box>

                    {/* Spice Level Chip */}
                    {item.spice_level && item.spice_level !== 'none' && (
                      <Chip
                        icon={<Flame size={10} color="#ffedd5" />}
                        label={item.spice_level.replace('_', ' ')}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 7,
                          right: 7,
                          height: 19,
                          fontSize: '9.5px',
                          bgcolor: 'rgba(15, 23, 42, 0.75)',
                          color: '#fff',
                          fontWeight: 700,
                          textTransform: 'capitalize',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          '& .MuiChip-icon': { ml: '4px', mr: '-3px' },
                          '& .MuiChip-label': { px: '5px' },
                        }}
                      />
                    )}

                    {/* Prep Time floating on bottom-left */}
                    {item.preparation_time && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 6,
                          left: 7,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          bgcolor: 'rgba(15, 23, 42, 0.75)',
                          backdropFilter: 'blur(6px)',
                          borderRadius: '5px',
                          px: 0.75,
                          py: 0.2,
                          color: '#ffffff',
                        }}
                      >
                        <Clock size={10} />
                        <Typography sx={{ fontSize: '10px', fontWeight: 700, lineHeight: 1 }}>
                          {item.preparation_time}m
                        </Typography>
                      </Box>
                    )}

                    {/* Inactive Overlay Badge */}
                    {!isItemActive && (
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          bgcolor: 'rgba(15, 23, 42, 0.55)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Chip
                          label="SOLD OUT / OFF"
                          size="small"
                          sx={{
                            fontSize: '9px',
                            fontWeight: 800,
                            bgcolor: '#ef4444',
                            color: '#ffffff',
                            height: 20,
                            letterSpacing: '0.5px',
                          }}
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Card Content */}
                  <CardContent sx={{ p: 1.25, pb: 0.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Dish Title */}
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        fontSize: '13px',
                        lineHeight: 1.2,
                        color: '#0f172a',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                      title={item.name}
                    >
                      {item.name}
                    </Typography>

                    {item.name_mr && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '11px',
                          color: '#64748b',
                          lineHeight: 1.1,
                          mt: 0.25,
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {item.name_mr}
                      </Typography>
                    )}

                    {/* Portion Charges */}
                    <Box
                      sx={{
                        mt: 'auto',
                        pt: 0.75,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.25,
                      }}
                    >
                      {item.charges && item.charges.length > 0 ? (
                        item.charges.slice(0, 2).map((c, idx) => {
                          const orig = Number(c.original_price ?? c.price ?? 0);
                          const disc =
                            c.discounted_price !== undefined &&
                            c.discounted_price !== null &&
                            Number(c.discounted_price) < orig
                              ? Number(c.discounted_price)
                              : null;
                          return (
                            <Box
                              key={idx}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '11px',
                                py: 0.15,
                                borderBottom: idx === 0 && item.charges.length > 1 ? '1px dashed #f1f5f9' : 'none',
                              }}
                            >
                              <Typography variant="caption" sx={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>
                                {c.size || 'Regular'}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontSize: '11.5px',
                                    fontWeight: 700,
                                    color: disc ? '#94a3b8' : '#0f172a',
                                    textDecoration: disc ? 'line-through' : 'none',
                                  }}
                                >
                                  ₹{orig}
                                </Typography>
                                {disc && (
                                  <Typography variant="caption" sx={{ fontSize: '11.5px', fontWeight: 800, color: '#be185d' }}>
                                    ₹{disc}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          );
                        })
                      ) : (
                        <Typography variant="caption" sx={{ fontSize: '11px', color: '#94a3b8' }}>
                          Price not specified
                        </Typography>
                      )}
                      {item.charges && item.charges.length > 2 && (
                        <Typography variant="caption" sx={{ fontSize: '10px', color: '#aa3bff', fontWeight: 600 }}>
                          +{item.charges.length - 2} more sizes
                        </Typography>
                      )}
                    </Box>
                  </CardContent>

                  {/* Card Actions Footer */}
                  <CardActions
                    sx={{
                      p: '5px 8px',
                      borderTop: '1px solid #f1f5f9',
                      bgcolor: '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Switch
                        size="small"
                        checked={isItemActive}
                        onChange={() => handleToggleItemAvailability(item)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#16a34a' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' },
                          transform: 'scale(0.75)',
                          m: -0.5,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: isItemActive ? '#16a34a' : '#94a3b8',
                          ml: 0.25,
                        }}
                      >
                        {isItemActive ? 'Active' : 'Off'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditItemModal(item);
                        }}
                        sx={{
                          p: 0.5,
                          color: '#0284c7',
                          bgcolor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          '&:hover': { bgcolor: '#0284c7', color: '#ffffff' },
                        }}
                        title="Edit Dish"
                      >
                        <Edit2 size={12} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDeleteItem(item);
                        }}
                        sx={{
                          p: 0.5,
                          color: '#ef4444',
                          bgcolor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          '&:hover': { bgcolor: '#ef4444', color: '#ffffff' },
                        }}
                        title="Delete Dish"
                      >
                        <Trash2 size={12} />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        )}
          </>
        )}
      </Box>

      {/* DIALOG 1: CATEGORY CREATE / EDIT */}
      <Dialog
        open={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          {editingCategory ? 'Edit Category' : 'Create Category'}
          <IconButton size="small" onClick={() => setCategoryModalOpen(false)}>
            <X size={18} />
          </IconButton>
        </DialogTitle>
        <Box component="form" onSubmit={handleSaveCategory}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Category Name (English)"
              placeholder="e.g. Biryani, Starters"
              size="small"
              fullWidth
              required
              value={catNameEn}
              onChange={(e) => setCatNameEn(e.target.value)}
            />
            <TextField
              label="Category Name (Marathi)"
              placeholder="e.g. बिर्याणी, स्टार्टर्स"
              size="small"
              fullWidth
              value={catNameMr}
              onChange={(e) => setCatNameMr(e.target.value)}
            />

            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Switch
                checked={catIsActive}
                onChange={(e) => setCatIsActive(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' },
                }}
              />
              <Typography sx={{ fontSize: '13.5px', fontWeight: 600 }}>
                {catIsActive ? 'Active (Visible to Customers)' : 'Turned Off (Hidden from Customers)'}
              </Typography>
            </Stack>

            <Box>
              <Typography sx={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', mb: 0.75 }}>
                Category Icon / Image
              </Typography>
              {catImagePreview && !catRemoveImage ? (
                <Box sx={{ position: 'relative', display: 'inline-block', borderRadius: '8px', overflow: 'hidden' }}>
                  <Box component="img" src={catImagePreview} alt="Preview" sx={{ width: 80, height: 80, objectFit: 'cover' }} />
                  <IconButton
                    size="small"
                    onClick={() => {
                      setCatImageFile(null);
                      setCatRemoveImage(true);
                      setCatImagePreview('');
                    }}
                    sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(0,0,0,0.6)', color: '#fff', p: 0.5 }}
                  >
                    <X size={14} />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  component="label"
                  sx={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: '10px',
                    p: 2,
                    textAlign: 'center',
                    bgcolor: '#f8fafc',
                    cursor: 'pointer',
                    display: 'block',
                    '&:hover': { borderColor: '#aa3bff', bgcolor: 'rgba(170, 59, 255, 0.04)' },
                  }}
                >
                  <Upload size={22} color="#94a3b8" style={{ margin: '0 auto 4px auto' }} />
                  <Typography sx={{ fontSize: '12.5px', fontWeight: 600, color: '#334155' }}>
                    Upload Icon
                  </Typography>
                  <Typography sx={{ fontSize: '11px', color: '#64748b' }}>
                    PNG, JPG up to 5MB
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setCatImageFile(file);
                        setCatRemoveImage(false);
                        setCatImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            {editingCategory && (
              <Button
                color="error"
                size="small"
                startIcon={<Trash2 size={14} />}
                onClick={() => setDeleteCategoryModalOpen(true)}
                sx={{ mr: 'auto', textTransform: 'none' }}
              >
                Delete
              </Button>
            )}
            <Button size="small" onClick={() => setCategoryModalOpen(false)} sx={{ textTransform: 'none' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={savingAction}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #aa3bff 0%, #7c3aed 100%)',
              }}
            >
              {savingAction ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* DIALOG 2: DELETE CATEGORY CONFIRMATION */}
      <Dialog
        open={deleteCategoryModalOpen}
        onClose={() => setDeleteCategoryModalOpen(false)}
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 1 }}>
          <AlertTriangle size={20} />
          Delete Category?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '14px', color: '#1e293b', mb: 1 }}>
            Are you sure you want to permanently delete <strong>"{catNameEn}"</strong>?
          </Typography>
          <Paper variant="outlined" sx={{ p: 1.5, bgcolor: '#fef2f2', borderColor: '#fee2e2', borderRadius: '8px' }}>
            <Typography sx={{ fontSize: '12.5px', color: '#991b1b', fontWeight: 600 }}>
              Warning: All dishes in this category will also be deleted!
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button size="small" onClick={() => setDeleteCategoryModalOpen(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleDeleteCategory}
            disabled={savingAction}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            {savingAction ? 'Deleting...' : 'Delete Category & Items'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG 3: TOGGLE CATEGORY STATUS CONFIRMATION */}
      <Dialog
        open={toggleCategoryModalOpen}
        onClose={() => setToggleCategoryModalOpen(false)}
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Power size={20} color={isCurrentCategoryOff ? '#16a34a' : '#dc2626'} />
          {isCurrentCategoryOff ? `Turn ON ${selectedType} Menu?` : `Turn OFF ${selectedType} Menu?`}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '14px', color: '#334155', lineHeight: 1.5 }}>
            {isCurrentCategoryOff
              ? `Turn ON the "${selectedType}" menu? All dishes in this category will become active and available for customer orders.`
              : `Turn OFF the "${selectedType}" menu? All dishes in this category will be marked as inactive and customers will NOT be able to place orders.`}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button size="small" onClick={() => setToggleCategoryModalOpen(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleConfirmToggleCategory}
            disabled={savingAction}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              bgcolor: isCurrentCategoryOff ? '#10b981' : '#dc2626',
              '&:hover': { bgcolor: isCurrentCategoryOff ? '#059669' : '#b91c1c' },
            }}
          >
            {savingAction ? 'Updating...' : isCurrentCategoryOff ? 'Turn ON Menu' : 'Turn OFF Menu'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG 4: MENU ITEM CREATE / EDIT (FULL SPEC MATCHING APP) */}
      <Dialog
        open={itemModalOpen}
        onClose={() => setItemModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px' } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 1.5,
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                bgcolor: editingItem ? 'rgba(2, 132, 199, 0.1)' : 'rgba(1, 135, 95, 0.1)',
                color: editingItem ? '#0284c7' : '#01875f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChefHat size={18} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '17px', color: '#0f172a', lineHeight: 1.2 }}>
                {editingItem ? `Edit "${editingItem.name}"` : 'Add New Menu Dish'}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                {editingItem ? 'Update dish details, image, prices & options' : 'Fill in details to add dish to catalog'}
              </Typography>
            </Box>
          </Stack>
          <IconButton size="small" onClick={() => setItemModalOpen(false)}>
            <X size={18} />
          </IconButton>
        </DialogTitle>

        <Box component="form" onSubmit={handleSaveMenuItem}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2.5 }}>
            {/* 1. Name: English & Marathi */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Dish Name (English) *"
                placeholder="e.g. Chicken Dum Biryani"
                size="small"
                fullWidth
                required
                value={itemNameEn}
                onChange={(e) => setItemNameEn(e.target.value)}
              />
              <TextField
                label="Dish Name (मराठी / Marathi)"
                placeholder="उदा. चिकन दम बिर्याणी"
                size="small"
                fullWidth
                value={itemNameMr}
                onChange={(e) => setItemNameMr(e.target.value)}
              />
            </Stack>

            {/* 2. Category Type (Dropdown & Quick Pills) */}
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#334155', mb: 1 }}>
                Category Type *
              </Typography>
              <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, '::-webkit-scrollbar': { height: '4px' } }}>
                {categories.map((c, i) => {
                  const val = typeof c === 'string' ? c : c.name;
                  const isSelected = itemCategory === val;
                  return (
                    <Chip
                      key={i}
                      clickable
                      onClick={() => setItemCategory(val)}
                      label={val}
                      sx={{
                        fontSize: '12px',
                        fontWeight: isSelected ? 700 : 500,
                        bgcolor: isSelected ? '#aa3bff' : '#f8fafc',
                        color: isSelected ? '#ffffff' : '#334155',
                        border: '1.5px solid',
                        borderColor: isSelected ? '#aa3bff' : '#e2e8f0',
                        '&:hover': {
                          bgcolor: isSelected ? '#9333ea' : '#f1f5f9',
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>

            {/* 3. Dietary (Veg / Non-Veg) & Active Switch & Prep Time */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              {/* Veg / Non-Veg Segmented Control */}
              <Box sx={{ flex: 1.2, width: '100%' }}>
                <Typography sx={{ fontSize: '12.5px', fontWeight: 600, color: '#475569', mb: 0.75 }}>
                  Dietary Classification
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    fullWidth
                    size="small"
                    variant={itemIsVeg ? 'contained' : 'outlined'}
                    onClick={() => setItemIsVeg(true)}
                    startIcon={
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          borderRadius: '2px',
                          border: `1.5px solid ${itemIsVeg ? '#fff' : '#16a34a'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: itemIsVeg ? '#fff' : '#16a34a' }} />
                      </Box>
                    }
                    sx={{
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '13px',
                      borderRadius: '8px',
                      bgcolor: itemIsVeg ? '#16a34a' : 'transparent',
                      color: itemIsVeg ? '#fff' : '#16a34a',
                      borderColor: '#16a34a',
                      '&:hover': { bgcolor: itemIsVeg ? '#15803d' : '#f0fdf4' },
                    }}
                  >
                    Vegetarian
                  </Button>
                  <Button
                    fullWidth
                    size="small"
                    variant={!itemIsVeg ? 'contained' : 'outlined'}
                    onClick={() => setItemIsVeg(false)}
                    startIcon={
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          borderRadius: '2px',
                          border: `1.5px solid ${!itemIsVeg ? '#fff' : '#dc2626'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box sx={{ width: 6, height: 6, borderRadius: '1px', bgcolor: !itemIsVeg ? '#fff' : '#dc2626' }} />
                      </Box>
                    }
                    sx={{
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '13px',
                      borderRadius: '8px',
                      bgcolor: !itemIsVeg ? '#dc2626' : 'transparent',
                      color: !itemIsVeg ? '#fff' : '#dc2626',
                      borderColor: '#dc2626',
                      '&:hover': { bgcolor: !itemIsVeg ? '#b91c1c' : '#fef2f2' },
                    }}
                  >
                    Non-Veg
                  </Button>
                </Stack>
              </Box>

              {/* Available Toggle */}
              <Box sx={{ flex: 1, width: '100%' }}>
                <Typography sx={{ fontSize: '12.5px', fontWeight: 600, color: '#475569', mb: 0.75 }}>
                  Availability Status
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: '6px 12px',
                    borderRadius: '8px',
                    borderColor: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, color: itemIsActive ? '#16a34a' : '#94a3b8' }}>
                    {itemIsActive ? 'Active (In Stock)' : 'Sold Out (Hidden)'}
                  </Typography>
                  <Switch
                    size="small"
                    checked={itemIsActive}
                    onChange={(e) => setItemIsActive(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#16a34a' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' },
                    }}
                  />
                </Paper>
              </Box>

              {/* Prep Time */}
              <Box sx={{ flex: 0.8, width: '100%' }}>
                <Typography sx={{ fontSize: '12.5px', fontWeight: 600, color: '#475569', mb: 0.75 }}>
                  Prep Time
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  fullWidth
                  value={itemPrepTime}
                  onChange={(e) => setItemPrepTime(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Clock size={14} color="#64748b" />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">min</InputAdornment>,
                  }}
                  inputProps={{ min: 1, max: 180 }}
                />
              </Box>
            </Stack>

            {/* 4. Spice Level (Matching App's 5 Levels) */}
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#334155', mb: 1 }}>
                Spice Level
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {SPICE_OPTIONS.map((opt) => {
                  const isSelected = itemSpiceLevel === opt.value;
                  return (
                    <Chip
                      key={opt.value}
                      clickable
                      onClick={() => setItemSpiceLevel(opt.value)}
                      label={opt.label}
                      sx={{
                        fontSize: '12.5px',
                        fontWeight: isSelected ? 700 : 500,
                        bgcolor: isSelected ? opt.color : '#f8fafc',
                        color: isSelected ? '#ffffff' : '#334155',
                        border: '1.5px solid',
                        borderColor: isSelected ? opt.color : '#e2e8f0',
                        '&:hover': {
                          bgcolor: isSelected ? opt.color : '#f1f5f9',
                          borderColor: opt.color,
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>

            {/* 5. Description: English & Marathi */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Description (English)"
                placeholder="उदा. Aromatic basmati rice cooked with fresh spices..."
                size="small"
                fullWidth
                multiline
                rows={2}
                value={itemDescEn}
                onChange={(e) => setItemDescEn(e.target.value)}
              />
              <TextField
                label="Description (मराठी / Marathi)"
                placeholder="उदा. तंदूरमध्ये भाजलेली आणि बटर लावलेली ताजी रोटी..."
                size="small"
                fullWidth
                multiline
                rows={2}
                value={itemDescMr}
                onChange={(e) => setItemDescMr(e.target.value)}
              />
            </Stack>

            {/* 6. Portions & Pricing (Sizes & Prices) */}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: '12px',
                bgcolor: '#fafafa',
                borderColor: '#e2e8f0',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
                <Box>
                  <Typography sx={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>
                    Sizes & Pricing (Charges) *
                  </Typography>
                  <Typography sx={{ fontSize: '11.5px', color: '#64748b' }}>
                    Configure portion sizes, base prices, and special discounted offer prices.
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Plus size={14} />}
                  onClick={handleAddChargeSize}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    borderColor: '#aa3bff',
                    color: '#aa3bff',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: 'rgba(170, 59, 255, 0.08)', borderColor: '#aa3bff' },
                  }}
                >
                  Add Size
                </Button>
              </Stack>

              <Stack spacing={1.25}>
                {itemCharges.map((ch, idx) => (
                  <Paper
                    key={idx}
                    elevation={0}
                    sx={{
                      p: 1.25,
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      bgcolor: '#ffffff',
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <TextField
                        label={`Portion Size #${idx + 1}`}
                        placeholder="e.g. Regular, Half, Full"
                        size="small"
                        required
                        value={ch.size}
                        onChange={(e) => handleChargeChange(idx, 'size', e.target.value)}
                        sx={{ flex: 1.3 }}
                      />
                      <TextField
                        label="Price (₹) *"
                        type="number"
                        size="small"
                        required
                        value={ch.price}
                        onChange={(e) => handleChargeChange(idx, 'price', e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                        inputProps={{ min: 0 }}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Offer Price (₹)"
                        type="number"
                        size="small"
                        placeholder="Optional"
                        value={ch.discounted_price || ''}
                        onChange={(e) => handleChargeChange(idx, 'discounted_price', e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                        inputProps={{ min: 0 }}
                        sx={{ flex: 1 }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveChargeSize(idx)}
                        disabled={itemCharges.length <= 1}
                        sx={{
                          color: itemCharges.length > 1 ? '#ef4444' : '#cbd5e1',
                          p: 0.75,
                        }}
                        title="Remove Portion Size"
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Paper>

            {/* 7. Image Upload / Change / Remove */}
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#334155', mb: 1 }}>
                Dish Photo
              </Typography>
              {itemImagePreview && !itemRemoveImage ? (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      position: 'relative',
                      width: 120,
                      height: 90,
                      borderRadius: '10px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <Box component="img" src={itemImagePreview} alt="Preview" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Stack spacing={1}>
                    <Button
                      component="label"
                      variant="outlined"
                      size="small"
                      startIcon={<Upload size={14} />}
                      sx={{ textTransform: 'none', fontSize: '12px', borderRadius: '6px' }}
                    >
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setItemImageFile(file);
                            setItemRemoveImage(false);
                            setItemImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<Trash2 size={14} />}
                      onClick={() => {
                        setItemImageFile(null);
                        setItemRemoveImage(true);
                        setItemImagePreview('');
                      }}
                      sx={{ textTransform: 'none', fontSize: '12px', borderRadius: '6px' }}
                    >
                      Remove Photo
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <Box
                  component="label"
                  sx={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    p: 2.5,
                    textAlign: 'center',
                    bgcolor: '#f8fafc',
                    cursor: 'pointer',
                    display: 'block',
                    transition: 'all 0.15s ease',
                    '&:hover': { borderColor: '#01875f', bgcolor: 'rgba(1, 135, 95, 0.04)' },
                  }}
                >
                  <Upload size={24} color="#01875f" style={{ margin: '0 auto 6px auto' }} />
                  <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                    Click to select and upload dish photo
                  </Typography>
                  <Typography sx={{ fontSize: '11px', color: '#64748b', mt: 0.25 }}>
                    Supports PNG, JPG, or WEBP up to 5MB
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setItemImageFile(file);
                        setItemRemoveImage(false);
                        setItemImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Box>
              )}
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 2.5, borderTop: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
            <Button
              size="small"
              onClick={() => setItemModalOpen(false)}
              disabled={savingAction}
              sx={{ textTransform: 'none', fontWeight: 600, color: '#64748b' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={savingAction}
              startIcon={savingAction ? <CircularProgress size={16} color="inherit" /> : <Check size={16} />}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '13px',
                borderRadius: '8px',
                px: 2.5,
                py: 0.8,
                background: 'linear-gradient(135deg, #01875f 0%, #059669 100%)',
                boxShadow: '0 4px 12px rgba(1, 135, 95, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #01704e 0%, #047857 100%)',
                },
              }}
            >
              {savingAction ? 'Saving Dish...' : editingItem ? 'Save Changes' : 'Add Dish to Menu'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* DIALOG 5: DELETE MENU ITEM CONFIRMATION */}
      <Dialog
        open={deleteItemModalOpen}
        onClose={() => setDeleteItemModalOpen(false)}
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 1 }}>
          <AlertTriangle size={20} />
          Delete Dish?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '14px', color: '#1e293b' }}>
            Are you sure you want to delete <strong>"{itemToDelete?.name}"</strong>? This will permanently remove it from customer ordering apps.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button size="small" onClick={() => setDeleteItemModalOpen(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleDeleteItem}
            disabled={savingAction}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            {savingAction ? 'Deleting...' : 'Delete Dish'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG 6: GLOBAL DISCOUNT */}
      <Dialog
        open={discountModalOpen}
        onClose={() => setDiscountModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Percent size={20} color="#be185d" />
          Branch Global Discount
        </DialogTitle>
        <Box component="form" onSubmit={handleSaveDiscount}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ fontSize: '13px', color: '#64748b' }}>
              Apply an instant percentage discount across all food menu items in <strong>{selectedBranch?.branch_name}</strong>.
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Switch
                checked={discountActive}
                onChange={(e) => setDiscountActive(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#ec4899' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#f472b6' },
                }}
              />
              <Typography sx={{ fontSize: '13.5px', fontWeight: 600 }}>
                {discountActive ? 'Discount Active' : 'Discount Inactive'}
              </Typography>
            </Stack>

            {discountActive && (
              <TextField
                label="Discount Percentage (%)"
                type="number"
                size="small"
                fullWidth
                required
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                inputProps={{ min: 1, max: 100 }}
              />
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button size="small" onClick={() => setDiscountModalOpen(false)} sx={{ textTransform: 'none' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={savingAction}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                bgcolor: '#ec4899',
                '&:hover': { bgcolor: '#db2777' },
              }}
            >
              {savingAction ? 'Saving...' : 'Save Discount'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
