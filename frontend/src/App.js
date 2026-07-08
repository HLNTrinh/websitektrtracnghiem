import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { TakeQuizPage } from './pages/TakeQuizPage';
import './App.css';

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
        {!user ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {user.role === 'student' && (
              <>
                <Route path="/student/dashboard" element={<StudentDashboardPage />} />
                <Route path="/quiz/:quizId" element={<TakeQuizPage />} />
              </>
            )}

            {user.role === 'teacher' && (
              <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
            )}

            {user.role === 'admin' && (
              <Route path="/admin/dashboard" element={<TeacherDashboardPage />} />
            )}

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