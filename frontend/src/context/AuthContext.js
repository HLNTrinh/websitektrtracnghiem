
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/services';

const AuthContext = createContext(null);

const normalizeAuthError = (error) => {
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.error) return error.response.data.error;
  return 'Đã có lỗi xảy ra. Vui lòng thử lại.';
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    authService.getMe()
      .then((data) => {
        const currentUser = data?.user || data;
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      })
      .catch((error) => {
        console.log('Get user error:', normalizeAuthError(error));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login({ email, password });
      const currentUser = data?.user || data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(currentUser));
      setUser(currentUser);
      return data;
    } catch (error) {
      throw new Error(normalizeAuthError(error));
    }
  };

  const register = async (name, email, password) => {
    try {
      return await authService.register({ name, email, password });
    } catch (error) {
      throw new Error(normalizeAuthError(error));
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    const currentPath = window.location.pathname;
    const redirectPath = currentPath.startsWith('/admin') ? '/admin' : '/login';
    window.location.href = redirectPath;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
