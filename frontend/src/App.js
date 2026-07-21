import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginPage, RegisterPage } from "./pages/AuthPages";

import StudentLayout from "./layouts/StudentLayout";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import ExamList from "./pages/ExamList";
import Results from "./pages/Results";
import Profile from "./pages/Profile";

import { TeacherDashboardPage } from "./pages/TeacherDashboardPage";
import { TakeQuizPage } from "./pages/TakeQuizPage";

import "./App.css";

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
  const { user, loading } = useAuth();

  if (loading) return <div>Đang tải...</div>;

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          {/* ================= STUDENT ================= */}
          {user.role === "student" && (
            <>
              <Route path="/student" element={<StudentLayout />}>
                <Route
                  path="dashboard"
                  element={<StudentDashboardPage />}
                />

<<<<<<< HEAD
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
                  path="/student/quizzes"
                  element={<StudentDashboardPage />}
                />
                <Route
                  path="/student/history"
                  element={<StudentDashboardPage />}
                />
                <Route
                  path="/student/profile"
                  element={<StudentDashboardPage />}
                />
                <Route
                  path="/student/settings"
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
=======
                <Route
                  path="exams"
                  element={<ExamList />}
                />

                <Route
                  path="results"
                  element={<Results />}
                />

                <Route
                  path="profile"
                  element={<Profile />}
                />
              </Route>

              <Route
                path="/quiz/:quizId"
                element={<TakeQuizPage />}
              />
            </>
          )}

          {/* ================= TEACHER ================= */}
          {user.role === "teacher" && (
>>>>>>> main
            <Route
              path="/teacher/dashboard"
              element={<TeacherDashboardPage />}
            />
<<<<<<< HEAD
          </>
        )}

      </Routes>
    </div>
=======
          )}

          {/* ================= ADMIN ================= */}
          {user.role === "admin" && (
            <Route
              path="/admin/dashboard"
              element={<TeacherDashboardPage />}
            />
          )}

          <Route
            path="*"
            element={
              <Navigate
                to={`/${user.role}/dashboard`}
                replace
              />
            }
          />
        </>
      )}
    </Routes>
>>>>>>> main
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}