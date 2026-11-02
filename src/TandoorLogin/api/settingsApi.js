import { apiClient } from './client';

export const settingsApi = {
  /**
   * Fetch all charges & delivery configs for the branch
   */
  async getChargesConfig(branchId) {
    if (!branchId) return null;
    const response = await apiClient('/charges/configs', {
      method: 'POST',
    });
    if (response && response.success && Array.isArray(response.data)) {
      return response.data.find(
        (c) => (c.branch_id?._id || c.branch_id) === branchId
      ) || null;
    }
    return null;
  },

  /**
   * Save charges, delivery, distance & refund config
   */
  async saveChargesConfig(payload) {
    return await apiClient('/charges/config', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Toggle Home Delivery Open / Closed
   */
  async toggleHomeDelivery(branchId, allow_home_delivery) {
    return await apiClient(`/branch/toggle-delivery/${branchId}`, {
      method: 'PUT',
      body: JSON.stringify({ allow_home_delivery: Boolean(allow_home_delivery) }),
    });
  },

  /**
   * Toggle COD and UPI Payment Methods
   */
  async togglePaymentMethods(branchId, { cod, upi }) {
    return await apiClient(`/branch/toggle-payment-methods/${branchId}`, {
      method: 'PUT',
      body: JSON.stringify({
        payment_methods: {
          cod: Boolean(cod),
          upi: Boolean(upi),
        },
      }),
    });
  },

  /**
   * Update hotel service shifts (morning & night hours)
   */
  async saveShifts(branchId, shifts) {
    return await apiClient(`/branch/shifts/${branchId}`, {
      method: 'PUT',
      body: JSON.stringify({ shifts }),
    });
  },

  /**
   * Update global discount percentage
   */
  async saveDiscount(branchId, discount) {
    return await apiClient(`/branch/discount/${branchId}`, {
      method: 'PUT',
      body: JSON.stringify({ discount }),
    });
  },

  /**
   * Save Order Automation (Auto-accept & cooking duration)
   */
  async saveOrderAutomation(payload) {
    return await apiClient('/auth/auto-accept', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Fetch customer app carousel banners
   */
  async getCarouselBanners(branchId) {
    if (!branchId) return [];
    const response = await apiClient(`/carousel/branch/${branchId}/all`, {
      method: 'GET',
    });
    if (response && response.success && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  },

  /**
   * Upload a new carousel banner
   */
  async uploadCarouselBanner(branchId, imageFile) {
    const formData = new FormData();
    formData.append('branch_id', branchId);
    formData.append('image', imageFile);

    return await apiClient('/carousel/upload', {
      method: 'POST',
      body: formData,
    });
  },

  /**
   * Delete a carousel banner
   */
  async deleteCarouselBanner(bannerId) {
    return await apiClient(`/carousel/${bannerId}`, {
      method: 'DELETE',
    });
  },
};
