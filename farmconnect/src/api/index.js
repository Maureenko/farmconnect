import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth token automatically
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default {
  // Auth
  login: (credentials) => API.post('/auth/login/', credentials),
  register: (userData) => API.post('/auth/register/', userData),
  
  // Products
  getProducts: () => API.get('/products/'),
  getProduct: (id) => API.get(`/products/${id}/`),
  
  // Orders
  createOrder: (orderData) => API.post('/orders/', orderData),
};