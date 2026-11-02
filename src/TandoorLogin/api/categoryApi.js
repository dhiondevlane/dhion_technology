import { apiClient } from './client';

export const categoryApi = {
  /**
   * Fetch all category types for a specific branch
   */
  async getCategories(branchId) {
    if (!branchId) return [];
    const response = await apiClient(`/menu/branch/${branchId}/types`);
    if (response && response.success && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  },

  /**
   * Create a new category type with optional icon
   */
  async createCategory({ branchId, name, name_mr = '', is_active = true, imageFile = null }) {
    const trimmedName = String(name || '').trim();
    const trimmedNameMr = String(name_mr || '').trim();

    const formData = new FormData();
    formData.append('branch_id', branchId);
    formData.append('name', trimmedName);
    formData.append('name_en', trimmedName);
    formData.append('name_mr', trimmedNameMr);
    formData.append(
      'languages',
      JSON.stringify({
        en: { name: trimmedName },
        mr: { name: trimmedNameMr },
      })
    );
    formData.append('is_active', String(is_active));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return await apiClient('/menu/types/create', {
      method: 'POST',
      body: formData,
    });
  },

  /**
   * Update category type details and optional icon
   */
  async updateCategory(typeId, { branchId, name, name_mr = '', is_active = true, imageFile = null, removeImage = false }) {
    const trimmedName = String(name || '').trim();
    const trimmedNameMr = String(name_mr || '').trim();

    const formData = new FormData();
    formData.append('branch_id', branchId);
    formData.append('name', trimmedName);
    formData.append('name_en', trimmedName);
    formData.append('name_mr', trimmedNameMr);
    formData.append(
      'languages',
      JSON.stringify({
        en: { name: trimmedName },
        mr: { name: trimmedNameMr },
      })
    );
    formData.append('is_active', String(is_active));

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (removeImage) {
      formData.append('remove_image', 'true');
    }

    return await apiClient(`/menu/types/update/${typeId}`, {
      method: 'PUT',
      body: formData,
    });
  },

  /**
   * Turn the entire category menu ON or OFF
   * (e.g. all Biryani items active or inactive)
   */
  async toggleCategoryMenu(branchId, typeName, isactive) {
    return await apiClient(
      `/menu/branch/${branchId}/types/${encodeURIComponent(typeName)}/toggle`,
      {
        method: 'PUT',
        body: JSON.stringify({ isactive: Boolean(isactive) }),
      }
    );
  },

  /**
   * Delete a category type and all items inside it
   */
  async deleteCategory(typeId, branchId) {
    return await apiClient(`/menu/types/delete/${typeId}`, {
      method: 'DELETE',
      body: JSON.stringify({ branch_id: branchId }),
    });
  },
};
