import React, { useState, useEffect } from 'react';
import { quizService } from '../services/authService';
import '../styles/Dashboard.css';

export const TeacherDashboardPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const data = await quizService.getQuizzes();
      setQuizzes(data.data ?? []);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="dashboard-container">
      <h1>Bảng điều khiển Giáo viên</h1>
      <div className="dashboard-actions">
        <button className="btn btn-primary">+ Tạo đề thi mới</button>
        <button className="btn btn-secondary">Quản lý câu hỏi</button>
      </div>

      <section className="dashboard-section">
        <h2>Danh sách đề thi</h2>
        {quizzes.length === 0 ? (
          <p>Chưa có đề thi nào</p>
        ) : (
          <table className="quizzes-table">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Số câu hỏi</th>
                <th>Thời gian (phút)</th>
                <th>Lần làm tối đa</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz._id}>
                  <td>{quiz.title}</td>
                  <td>{quiz.questions?.length ?? 0}</td>
                  <td>{quiz.duration}</td>
                  <td>{quiz.maxAttempts}</td>
                  <td>
                    <button>Sửa</button>
                    <button>Xóa</button>
                    <button>Xem kết quả</button>
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