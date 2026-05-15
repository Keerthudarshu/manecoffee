import apiClient from './api';

const checkoutApi = {
  async saveSelection(email, payload) {
    const res = await apiClient.post('/checkout/selection', payload, { params: { email } });
    return res.data;
  },
  async review(email) {
    const res = await apiClient.get('/checkout/review', { params: { email } });
    return res.data;
  },
  async placeOrder(email) {
    const res = await apiClient.post('/checkout/place-order', {}, { params: { email } });
    return res.data;
  }
  ,
  async createRazorpayOrder(email, amount) {
    const res = await apiClient.post('/payments/razorpay/create-order', { amount }, { params: { email } });
    return res.data;
  },
  async verifyRazorpayPayment(payload) {
    const res = await apiClient.post('/payments/razorpay/verify', payload);
    return res.data;
  }
};

export default checkoutApi;


