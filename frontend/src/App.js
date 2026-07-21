import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { TakeQuizPage } from './pages/TakeQuizPage';
import './App.css';

// Thêm trang admin
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";
import AdminSubjectManagementPage from "./pages/AdminSubjectManagementPage";
import AdminClassManagementPage from "./pages/AdminClassManagementPage";
import AdminNotificationManagementPage from "./pages/AdminNotificationManagementPage";
import AdminSettingManagementPage from "./pages/AdminSettingManagementPage";
import EduQuizPage from "./pages/EduQuizPage";

function AppRoutes() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="App">
      {user && (
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>📚 Hệ Thống Kiểm Tra Trắc Nghiệm</h1>
          </div>
          <div className="navbar-user">
            <span>Xin chào, {user.name}!</span>
            <button onClick={logout}>Đăng xuất</button>
          </div>
        </nav>
      )}

      <Routes>

        {/* ===== Public Route cho Admin ===== */}
        <Route path="/admin" element={<AdminLoginPage />} />
        {/* Test giao diện trang adminbroadbash trước nào có backend với CSDL thì bỏ ra */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />}/>
        {/* Test giao diện Quản lý người dùng */}
        <Route
          path="/admin/users"
          element={<AdminUserManagementPage />}
        />
        <Route path="/admin/subject" element={<AdminSubjectManagementPage />} />
        <Route path="/admin/subjects" element={<AdminSubjectManagementPage />} />
        <Route path="/admin/class" element={<AdminClassManagementPage />} />
        <Route path="/admin/notifications" element={<AdminNotificationManagementPage />} />
        <Route path="/admin/settings" element={<AdminSettingManagementPage />} />
        {!user ? (
          <>
            {/* Đăng nhập Teacher / Student */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<EduQuizPage />} />
            <Route path="/home" element={<EduQuizPage />} />
            {/* Mặc định */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* ===== Student ===== */}
            {user.role === "student" && (
              <>
                <Route
                  path="/student/dashboard"
                  element={<StudentDashboardPage />}
                />
                <Route
                  path="/quiz/:quizId"
                  element={<TakeQuizPage />}
                />
              </>
            )}

            {/* ===== Teacher ===== */}
            {user.role === "teacher" && (
              <Route
                path="/teacher/dashboard"
                element={<TeacherDashboardPage />}
              />
            )}

            {/* ===== Admin ===== */}
            {user.role === "admin" && (
              <Route
                path="/admin/dashboard"
                element={<AdminDashboardPage />}
              />
            )}

            {/* Route mặc định sau khi đăng nhập */}
            <Route
              path="*"
              element={<Navigate to={`/${user.role}/dashboard`} />}
            />
          </>
        )}

      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;