import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getProducts = () =>
  api.get('/products');

export const getProduct = (id) =>
  api.get(`/products/${id}`);

export const getCart = () =>
  api.get('/cart');

export const addToCart = (productId, quantity = 1) =>
  api.post('/cart', { productId, quantity });

export const updateCartItem = (productId, quantity) =>
  api.put('/cart', { productId, quantity });

export const removeFromCart = (productId) =>
  api.delete(`/cart/${productId}`);

export default api;
