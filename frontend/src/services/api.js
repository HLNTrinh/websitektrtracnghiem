import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Tự động đính kèm token vào mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Tự động xử lý lỗi response
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Đã có lỗi xảy ra';
    const pathname = window.location.pathname;
    const isAdminRoute = pathname.startsWith('/admin');
    //const isPublicRoute = ['/login', '/register', '/admin'].includes(pathname);
    const isPublicRoute = ['/', '/home', '/login', '/register', '/admin'].includes(pathname);

    // Token hết hạn hoặc không hợp lệ → chỉ tự động logout cho các route không phải admin/public
    if (error.response?.status === 401 && !isAdminRoute && !isPublicRoute) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(new Error(message));
  }
);

export default api;