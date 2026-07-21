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
            <Route
              path="/teacher/dashboard"
              element={<TeacherDashboardPage />}
            />
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