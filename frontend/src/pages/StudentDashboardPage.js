import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { quizAttemptService, quizService } from '../services/services';
import '../styles/Dashboard.css';

const MONTHS = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];

export const StudentDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [attemptsRes, quizzesRes] = await Promise.all([
        quizAttemptService.getStudentAttempts().catch(() => ({ data: [] })),
        quizService.getQuizzes().catch(() => ({ data: [] })),
      ]);
      setAttempts(attemptsRes.data ?? []);
      setQuizzes(quizzesRes.data ?? []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const completed = attempts.filter((a) => a.status === 'submitted');
    const avgScore = completed.length
      ? (completed.reduce((s, a) => s + (a.percentage ?? 0), 0) / completed.length).toFixed(1)
      : '0.0';
    const now = new Date();
    const upcoming = quizzes.filter((q) => !q.endDate || new Date(q.endDate) >= now);
    return { assigned: quizzes.length, upcomingCount: upcoming.length, completed: completed.length, avgScore };
  }, [attempts, quizzes]);

  const upcomingQuizzes = useMemo(() => {
    const now = new Date();
    return quizzes
      .filter((q) => !q.endDate || new Date(q.endDate) >= now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .slice(0, 3);
  }, [quizzes]);

  const recentAttempts = useMemo(() => {
    return [...attempts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
  }, [attempts]);

  const chartData = useMemo(() => {
    const byMonth = {};
    attempts.filter((a) => a.status === 'submitted').forEach((a) => {
      const m = new Date(a.createdAt).getMonth();
      (byMonth[m] ??= []).push(a.percentage ?? 0);
    });
    const currentMonth = new Date().getMonth();
    return Array.from({ length: 6 }, (_, i) => ((currentMonth - 5 + i) % 12 + 12) % 12).map((m) => {
      const scores = byMonth[m] ?? [];
      const avg = scores.length ? scores.reduce((s, v) => s + v, 0) / scores.length : 0;
      return { month: MONTHS[m], value: Math.round(avg) };
    });
  }, [attempts]);

  const formatDate = (date) => {
    const d = new Date(date);
    return { day: d.getDate().toString().padStart(2, '0'), month: `TH.${d.getMonth() + 1}` };
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="dash-shell">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">🎓</div>
          <div>
            <p className="sidebar-brand-name">EduQuiz</p>
            <p className="sidebar-brand-sub">HỌC SINH</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a className="sidebar-link sidebar-link--active" href="#">
            <span className="sidebar-icon">▦</span> Tổng quan
          </a>
          <a className="sidebar-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/student/quizzes'); }}>
            <span className="sidebar-icon">📄</span> Bài thi
          </a>
          <a className="sidebar-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/student/history'); }}>
            <span className="sidebar-icon">🕒</span> Lịch sử
          </a>
          <a className="sidebar-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/profile'); }}>
            <span className="sidebar-icon">👤</span> Hồ sơ
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a className="sidebar-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/settings'); }}>
            <span className="sidebar-icon">⚙️</span> Cài đặt
          </a>
          <a className="sidebar-link sidebar-link--danger" href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
            <span className="sidebar-icon">↪</span> Đăng xuất
          </a>
        </div>
      </aside>

      {/* ===== Main content ===== */}
      <main className="dash-main">
        <header className="dash-header">
          <div>
            <h1 className="dash-greeting">Chào buổi sáng, {user?.name ?? 'bạn'}! 👋</h1>
            <p className="dash-subtitle">Bạn có {stats.upcomingCount} bài thi cần hoàn thành trong tuần này.</p>
          </div>
          <div className="dash-header-actions">
            <button className="icon-btn">
              🔔<span className="icon-btn-dot" />
            </button>
            <div className="header-user">
              <div className="header-avatar">{user?.name?.charAt(0) ?? '?'}</div>
              <span>{user?.name}</span>
            </div>
          </div>
        </header>

        <section className="stat-grid">
          <div className="stat-card stat-card--primary">
            <div className="stat-card-icon">📋</div>
            <p className="stat-card-label">BÀI THI ĐƯỢC GIAO</p>
            <p className="stat-card-value">{stats.assigned.toString().padStart(2, '0')}</p>
            <p className="stat-card-note">{stats.upcomingCount} bài sắp đến hạn</p>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon stat-card-icon--success">✓</div>
            <p className="stat-card-label">ĐÃ HOÀN THÀNH</p>
            <p className="stat-card-value">{stats.completed}</p>
            <p className="stat-card-note stat-card-note--success">Tổng số bài đã nộp</p>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon stat-card-icon--warning">★</div>
            <p className="stat-card-label">ĐIỂM TRUNG BÌNH</p>
            <p className="stat-card-value">{stats.avgScore}</p>
            <p className="stat-card-note">Trên thang điểm 100</p>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon stat-card-icon--primary">Σ</div>
            <p className="stat-card-label">TỔNG SỐ ĐỀ THI</p>
            <p className="stat-card-value-sm">{quizzes.length} đề</p>
            <p className="stat-card-note">Đang khả dụng</p>
          </div>
        </section>

        <div className="dash-columns">
          {/* Left column */}
          <div className="dash-col-main">
            <section className="panel">
              <div className="panel-header">
                <div>
                  <h2 className="panel-title">Tiến độ học tập</h2>
                  <p className="panel-subtitle">Thống kê điểm số 6 tháng gần nhất</p>
                </div>
              </div>
              <div className="chart">
                {chartData.map((point, i) => (
                  <div className="chart-col" key={i}>
                    <div className="chart-bar-track">
                      <div className="chart-bar" style={{ height: `${Math.max(point.value, 2)}%` }} title={`${point.value}%`} />
                    </div>
                    <span className="chart-label">{point.month}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <h2 className="panel-title">Bài thi sắp đến hạn</h2>
                <a className="panel-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/student/quizzes'); }}>Xem tất cả</a>
              </div>

              {upcomingQuizzes.length === 0 ? (
                <p className="empty-note">Không có bài thi nào sắp đến hạn.</p>
              ) : (
                <div className="quiz-list">
                  {upcomingQuizzes.map((quiz, idx) => {
                    const { day, month } = formatDate(quiz.startDate);
                    return (
                      <div className="quiz-row" key={quiz._id}>
                        <div className={`quiz-date ${idx === 1 ? 'quiz-date--warn' : ''}`}>
                          <span className="quiz-date-day">{day}</span>
                          <span className="quiz-date-month">{month}</span>
                        </div>
                        <div className="quiz-info">
                          <p className="quiz-title">{quiz.title}</p>
                          <p className="quiz-meta">⏱ {quiz.duration} phút · 📄 {quiz.questions?.length ?? 0} câu</p>
                        </div>
                        {idx < 2 ? (
                          <button className="btn-start" onClick={() => navigate(`/quiz/${quiz._id}`)}>Bắt đầu</button>
                        ) : (
                          <button className="btn-outline" onClick={() => navigate(`/quiz/${quiz._id}`)}>Chi tiết</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Right column */}
          <div className="dash-col-side">
            <aside className="profile-card">
              <div className="profile-card-banner" />
              <div className="profile-card-body">
                <div className="profile-avatar">{user?.name?.charAt(0) ?? '?'}</div>
                <h3 className="profile-name">{user?.name}</h3>
                <p className="profile-meta">{user?.email}</p>
                <button className="btn-block" onClick={() => navigate('/profile')}>Xem hồ sơ đầy đủ</button>
              </div>
            </aside>

            <section className="panel">
              <div className="panel-header"><h2 className="panel-title">Kết quả gần đây</h2></div>
              {recentAttempts.length === 0 ? (
                <p className="empty-note">Chưa có lần làm bài nào.</p>
              ) : (
                <div className="result-list">
                  {recentAttempts.map((attempt) => (
                    <div className="result-row" key={attempt._id}>
                      <span className={`result-badge ${attempt.isPassed ? 'result-badge--pass' : 'result-badge--fail'}`}>
                        {attempt.isPassed ? '✓' : '!'}
                      </span>
                      <div className="result-info">
                        <p className="result-title">{attempt.quizId?.title ?? 'Đề thi'}</p>
                        <p className="result-time">{new Date(attempt.createdAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                      <span className="result-score">{attempt.score}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="challenge-card">
              <p className="challenge-eyebrow">THỬ THÁCH TUẦN</p>
              <p className="challenge-text">Hoàn thành 5 bài thi trắc nghiệm để nhận 100 điểm thưởng!</p>
              <div className="challenge-bar">
                <div className="challenge-bar-fill" style={{ width: `${Math.min((stats.completed / 5) * 100, 100)}%` }} />
              </div>
              <p className="challenge-progress">{Math.min(stats.completed, 5)}/5 bài hoàn tất</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};