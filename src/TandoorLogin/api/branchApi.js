import { apiClient } from './client';

export const branchApi = {
  /**
   * Fetch all branches accessible to the current logged-in role
   */
  async getBranches() {
    const response = await apiClient('/branch/branches');
    if (response && response.success && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  },

  /**
   * Update branch global discount (e.g. 10% off)
   */
  async updateBranchDiscount(branchId, { is_active, percentage }) {
    const payload = {
      is_active: Boolean(is_active),
      percentage: is_active ? Number(percentage) || 0 : 0,
    };
    return await apiClient(`/branch/discount/${branchId}`, {
      method: 'PUT',
      body: JSON.stringify({ discount: payload }),
    });
  },
};
