import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
  timeout: 10000, // Set a timeout for requests
});

// Add a request interceptor to include token in headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming token is stored in local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle specific error responses here
  return Promise.reject(error);
});

export default api;