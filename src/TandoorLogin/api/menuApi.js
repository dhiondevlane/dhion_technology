import { apiClient } from './client';

export const menuApi = {
  /**
   * Fetch menu items for a category type
   */
  async getMenusByType(branchId, typeName, page = 1, limit = 50) {
    return await apiClient(
      `/menu/branch/${branchId}/types/${encodeURIComponent(typeName)}?page=${page}&limit=${limit}`
    );
  },

  /**
   * Search menu items by query string within a category or all
   */
  async searchMenus(branchId, query, typeName = '', page = 1, limit = 50) {
    const typeParam = typeName ? `&type=${encodeURIComponent(typeName)}` : '';
    return await apiClient(
      `/menu/branch/${branchId}/search?q=${encodeURIComponent(query)}${typeParam}&page=${page}&limit=${limit}`
    );
  },

  /**
   * Create a new menu item
   */
  async createMenuItem(branchId, itemData) {
    const formData = new FormData();
    formData.append('branch_id', branchId);
    formData.append('name', itemData.name.trim());
    formData.append('name_en', itemData.name.trim());
    formData.append('name_mr', (itemData.name_mr || '').trim());
    formData.append('description', (itemData.description || '').trim());
    formData.append('description_en', (itemData.description || '').trim());
    formData.append('description_mr', (itemData.description_mr || '').trim());
    formData.append(
      'languages',
      JSON.stringify({
        en: {
          name: itemData.name.trim(),
          description: (itemData.description || '').trim(),
        },
        mr: {
          name: (itemData.name_mr || '').trim(),
          description: (itemData.description_mr || '').trim(),
        },
      })
    );
    formData.append('charges', JSON.stringify(itemData.charges));
    formData.append('type', itemData.type);
    formData.append('isveg', String(itemData.isveg));
    formData.append('isactive', String(itemData.isactive));
    formData.append('preparation_time', String(itemData.preparation_time || 15));
    formData.append('spice_level', itemData.spice_level || 'none');

    if (itemData.imageFile) {
      formData.append('images', itemData.imageFile);
    } else {
      formData.append('images', JSON.stringify([]));
    }

    return await apiClient('/menu/create', {
      method: 'POST',
      body: formData,
    });
  },

  /**
   * Update an existing menu item
   */
  async updateMenuItem(itemId, branchId, itemData) {
    const formData = new FormData();
    formData.append('branch_id', branchId);
    formData.append('name', itemData.name.trim());
    formData.append('name_en', itemData.name.trim());
    formData.append('name_mr', (itemData.name_mr || '').trim());
    formData.append('description', (itemData.description || '').trim());
    formData.append('description_en', (itemData.description || '').trim());
    formData.append('description_mr', (itemData.description_mr || '').trim());
    formData.append(
      'languages',
      JSON.stringify({
        en: {
          name: itemData.name.trim(),
          description: (itemData.description || '').trim(),
        },
        mr: {
          name: (itemData.name_mr || '').trim(),
          description: (itemData.description_mr || '').trim(),
        },
      })
    );
    formData.append('charges', JSON.stringify(itemData.charges));
    formData.append('type', itemData.type);
    formData.append('isveg', String(itemData.isveg));
    formData.append('isactive', String(itemData.isactive));
    formData.append('preparation_time', String(itemData.preparation_time || 15));
    formData.append('spice_level', itemData.spice_level || 'none');

    if (itemData.imageFile) {
      formData.append('images', itemData.imageFile);
    } else if (itemData.removeImage) {
      formData.append('images', JSON.stringify([]));
    } else if (itemData.existingImages && itemData.existingImages.length > 0) {
      formData.append('images', JSON.stringify(itemData.existingImages));
    } else {
      formData.append('images', JSON.stringify([]));
    }

    return await apiClient(`/menu/update/${itemId}`, {
      method: 'PUT',
      body: formData,
    });
  },

  /**
   * Fast toggle item active/inactive status
   */
  async toggleAvailability(itemId, branchId, isactive) {
    return await apiClient(`/menu/update/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({
        branch_id: branchId,
        isactive: Boolean(isactive),
      }),
    });
  },

  /**
   * Delete a menu item permanently
   */
  async deleteMenuItem(itemId, branchId) {
    return await apiClient(`/menu/delete/${itemId}`, {
      method: 'DELETE',
      body: JSON.stringify({ branch_id: branchId }),
    });
  },
};
