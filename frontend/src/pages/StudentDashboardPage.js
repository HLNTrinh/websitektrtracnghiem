import React, { useState, useEffect } from 'react';
import { quizAttemptService } from '../services/authService';
import '../styles/Dashboard.css';

export const StudentDashboardPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const response = await quizAttemptService.getStudentAttempts();
      setAttempts(response.data.data);
    } catch (error) {
      console.error('Failed to fetch attempts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="dashboard-container">
      <h1>Bảng điều khiển Học sinh</h1>
      <section className="dashboard-section">
        <h2>Lịch sử làm bài</h2>
        {attempts.length === 0 ? (
          <p>Chưa có lần làm bài nào</p>
        ) : (
          <table className="attempts-table">
            <thead>
              <tr>
                <th>Tên đề thi</th>
                <th>Điểm</th>
                <th>Số câu đúng</th>
                <th>Ngày làm</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => (
                <tr key={attempt._id}>
                  <td>{attempt.quizId.title}</td>
                  <td>{attempt.score}/{attempt.totalQuestions}</td>
                  <td>{attempt.correctAnswers}/{attempt.totalQuestions}</td>
                  <td>{new Date(attempt.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <button>Xem chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};
