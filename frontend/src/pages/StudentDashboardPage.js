import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

const stats = [
  {
    label: "BÀI THI ĐƯỢC GIAO",
    value: "08",
    sub: "3 bài sắp đến hạn",
    highlight: true,
    icon: "📋",
  },
  {
    label: "ĐÃ HOÀN THÀNH",
    value: "24",
    sub: "+2 bài tuần này",
    subColor: "success",
    icon: "✅",
  },
  {
    label: "ĐIỂM TRUNG BÌNH",
    value: "8.4",
    sub: "Nằm trong top 10%",
    icon: "⭐",
  },
  {
    label: "MÔN HỌC MẠNH NHẤT",
    value: "Toán Học",
    valueSmall: true,
    sub: "Tỉ lệ đúng 92%",
    icon: "∑",
  },
];

const upcoming = [
  {
    day: "24",
    month: "TH.10",
    title: "Kiểm tra Giữa kỳ II - Toán 12",
    time: "60 phút",
    questions: "40 câu",
    cta: "Bắt đầu",
    urgent: true,
  },
  {
    day: "26",
    month: "TH.10",
    title: "Vật Lý 12 - Ôn tập Chương IV",
    time: "45 phút",
    questions: "30 câu",
    cta: "Bắt đầu",
    urgent: true,
  },
];

const recentResults = [
  {
    subject: "Hóa học 12",
    time: "2 giờ trước",
    score: "9.5",
    ok: true,
  },
  {
    subject: "Lịch sử 12",
    time: "Hôm qua",
    score: "8.0",
    ok: true,
  },
  {
    subject: "Sinh học 12",
    time: "3 ngày trước",
    score: "6.5",
    ok: false,
  },
];

export default function StudentDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* HEADER */}
      <header className="dash-header">
        <div>
          <h1>Chào buổi sáng, {user?.name || "Học sinh"}! 👋</h1>
          <p>Bạn có 3 bài thi cần hoàn thành trong tuần này.</p>
        </div>

        <div className="dash-header-actions">
          <div className="user-chip">
            <img
              src={user?.avatar || "https://i.pravatar.cc/64?img=12"}
              alt="avatar"
            />
            <span>{user?.name || "Học sinh"}</span>
          </div>

          <button className="btn-outline" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </header>

      {/* STATISTICS */}
      <section className="stat-grid">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`stat-card ${s.highlight ? "highlight" : ""}`}
          >
            <div className="stat-top">
              <span className="stat-label">{s.label}</span>
              <span className="stat-icon">{s.icon}</span>
            </div>

            <div className={`stat-value ${s.valueSmall ? "small" : ""}`}>
              {s.value}
            </div>

            <div className={`stat-sub ${s.subColor || ""}`}>
              {s.sub}
            </div>
          </div>
        ))}
      </section>

      {/* Upcoming */}
      <div className="card">
        <div className="card-head">
          <h3>Bài thi sắp đến hạn</h3>

          <Link to="/student/exams" className="view-all">
            Xem tất cả
          </Link>
        </div>

        <div className="exam-rows">
          {upcoming.map((e) => (
            <div className="exam-row" key={e.title}>
              <div className={`date-badge ${e.urgent ? "urgent" : ""}`}>
                <span>{e.day}</span>
                <small>{e.month}</small>
              </div>

              <div className="exam-info">
                <div className="exam-title">{e.title}</div>

                <div className="exam-meta">
                  🕒 {e.time} &nbsp;&nbsp; 📄 {e.questions}
                </div>
              </div>

              <button className="btn-primary">{e.cta}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="card">
        <div className="card-head">
          <h3>Kết quả gần đây</h3>
        </div>

        <div className="result-rows">
          {recentResults.map((r) => (
            <div className="result-row" key={r.subject}>
              <span className={`result-flag ${r.ok ? "ok" : "warn"}`}>
                {r.ok ? "✓" : "!"}
              </span>

              <div className="result-info">
                <div className="result-subject">{r.subject}</div>
                <div className="result-time">{r.time}</div>
              </div>

              <strong className="result-score">{r.score}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Challenge */}
      <div className="challenge-card">
        <span className="eyebrow">THỬ THÁCH TUẦN</span>

        <p>
          Hoàn thành 5 bài thi trắc nghiệm để nhận 100 điểm thưởng!
        </p>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: "60%" }}
          />
        </div>

        <span className="progress-label">
          3/5 bài hoàn tất
        </span>
      </div>
    </>
  );
}