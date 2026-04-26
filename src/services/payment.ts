import api from './api';

export const paymentService = {
  // Load Razorpay SDK
  loadRazorpayScript: () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  createRazorpayOrder: async (orderId: string) => {
    const response = await api.post('/payment/create-order', { order_id: orderId });
    return response.data;
  },

  verifyPayment: async (verificationData: any) => {
    const response = await api.post('/payment/verify', verificationData);
    return response.data;
  }
};
