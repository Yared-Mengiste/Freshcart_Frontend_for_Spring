// axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:8081/api';

const axiosInstance = axios.create({
  baseURL: `${apiUrl}api`, // Ensure this matches your backend's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
