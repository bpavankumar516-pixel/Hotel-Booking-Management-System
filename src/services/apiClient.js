import axios from 'axios';
import { toast } from 'react-toastify';

// Create a configured Axios Instance
export const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hotel_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Uniform Error Handling & Toast Notifications
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      'Network communication error. Falling back to local data.';

    // Only toast on server error responses (5xx or 4xx)
    if (error.response && error.response.status >= 400) {
      toast.error(`API Notice (${error.response.status}): ${errorMsg}`);
    } else if (error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
      console.warn('API Connection Warning:', errorMsg);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
