import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import StudentDashboardPage from './layouts/StudentDashboardPage';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { ExamManager } from './pages/ExamManager';
import { QuestionManager } from './pages/QuestionManager';
import { MembersPage } from './pages/MembersPage';
import { TakeQuizPage } from './pages/TakeQuizPage';
import { ResultPage } from './pages/ResultPage';
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
            {/* Giao diện trang chủ cho người dùng chưa đăng nhập */}
            <Route path="/" element={<EduQuizPage />} />
            <Route path="/home" element={<EduQuizPage />} />
            {/* Đăng nhập Teacher / Student */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to={`/${user.role}/dashboard`} replace />} />
            {user.role === 'student' && (
              <>
                <Route
                  path="/student/dashboard"
                  element={<StudentDashboardPage />}
                />
                <Route
                  path="/quiz/:quizId"
                  element={<TakeQuizPage />}
                />
                <Route
                  path="/result/:attemptId"
                  element={<ResultPage />}
                />
              </>
            )}
            {user.role === 'teacher' && (
              <>
                <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
                <Route path="/teacher/exams" element={<ExamManager />} />
                <Route path="/teacher/questions" element={<QuestionManager />} />
                <Route path="/teacher/members" element={<MembersPage />} />
                <Route path="/teacher/results" element={<ResultPage />} />
              </>
            )}

            {user.role === 'admin' && (
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
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
