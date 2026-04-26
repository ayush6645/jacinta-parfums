import api from './api';

export const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (variantId: string, quantity: number = 1) => {
    const response = await api.post('/cart/add/real', { variant_id: variantId, quantity });
    return response.data;
  },

  updateQuantity: async (itemId: string, quantity: number) => {
    const response = await api.put(`/cart/item/${itemId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (itemId: string) => {
    const response = await api.delete(`/cart/item/${itemId}`);
    return response.data;
  }
};
