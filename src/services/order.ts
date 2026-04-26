import api from './api';

export const orderService = {
  checkout: async (orderData: any) => {
    const response = await api.post('/orders/checkout', orderData);
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrderDetail: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }
};
