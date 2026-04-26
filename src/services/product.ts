import api from './api';

export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProductDetail: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getCategories: async () => {
    // Optional: Add category listing to backend
    const response = await api.get('/products/categories');
    return response.data;
  }
};
