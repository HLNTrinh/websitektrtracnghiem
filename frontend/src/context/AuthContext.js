<<<<<<< HEAD

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/services';

const AuthContext = createContext(null);

const normalizeAuthError = (error) => {
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.error) return error.response.data.error;
  return 'Đã có lỗi xảy ra. Vui lòng thử lại.';
};

=======
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/services";

const AuthContext = createContext(null);

>>>>>>> main
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

<<<<<<< HEAD
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
=======
    authService
      .getMe()
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((error) => {
        console.log("Get user error:", error.message);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
>>>>>>> main
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

<<<<<<< HEAD
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
=======
  // Đăng nhập
  const login = async (email, password) => {
    const data = await authService.login({
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);

    return data;
  };

  // Đăng ký
  const register = async (name, email, password) => {
    return authService.register({
      name,
      email,
      password,
    });
  };

  // Đăng xuất
  const logout = () => {
    // Nếu có API logout thì gọi
    if (authService.logout) {
      authService.logout();
    }

    // Xóa dữ liệu đăng nhập
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Xóa user trong Context
    setUser(null);

    // Chuyển về trang đăng nhập
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
>>>>>>> main
      {!loading && children}
    </AuthContext.Provider>
  );
};

<<<<<<< HEAD
export const useAuth = () => useContext(AuthContext);
=======
export const useAuth = () => {
  return useContext(AuthContext);
};
>>>>>>> main
