import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Request Interceptor to add JWT
api.interceptors.request.use(
  (config) => {
    const authString = localStorage.getItem('auth-storage');
    if (authString) {
      try {
        const { state } = JSON.parse(authString);
        if (state.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (err) {
        console.error('Failed to parse auth storage', err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
