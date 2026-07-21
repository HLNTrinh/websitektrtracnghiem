import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { 
  MdTrendingUp,
  MdCheckCircle,
  MdQuiz,
  MdPeople
} from 'react-icons/md';
import '../styles/AdminDashboard.css';

export default function AdminDashboardPage() {
  // Trạng thái tìm kiếm hoạt động
  const [searchQuery, setSearchQuery] = useState('');
  
  // Trạng thái lọc biểu đồ cột (ngày / tuần)
  const [chartPeriod, setChartPeriod] = useState('day');

  // Mock data cho danh sách hoạt động gần đây
  const mockActivities = [
    {
      id: 1,
      name: 'Lê Minh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80',
      action: 'Nộp bài thi',
      badgeClass: 'green',
      target: 'Kiểm tra Toán 12 - Giải tích',
      time: '2 phút trước'
    },
    {
      id: 2,
      name: 'Nguyễn Văn Khải',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=80',
      action: 'Tạo đề thi mới',
      badgeClass: 'blue',
      target: 'Ôn tập Vật Lý - Quang học',
      time: '15 phút trước'
    },
    {
      id: 3,
      name: 'Trần Thị Mai',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80',
      action: 'Cập nhật hệ thống',
      badgeClass: 'warning',
      target: 'Cài đặt phân quyền lớp 10A2',
      time: '1 giờ trước'
    },
    {
      id: 4,
      name: 'Phạm Minh Đức',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&fit=crop&q=80',
      action: 'Nộp bài thi',
      badgeClass: 'green',
      target: 'Đề khảo sát Hoá học 11',
      time: '2 giờ trước'
    },
    {
      id: 5,
      name: 'Hoàng Lan Anh',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&fit=crop&q=80',
      action: 'Tạo đề thi mới',
      badgeClass: 'blue',
      target: 'Kiểm tra học kỳ 2 Tiếng Anh',
      time: '3 giờ trước'
    }
  ];

  // Dữ liệu biểu đồ cột theo Ngày và Tuần
  const barChartData = {
    day: [
      { label: 'T2', height: '65%', count: '452 bài' },
      { label: 'T3', height: '45%', count: '312 bài' },
      { label: 'T4', height: '85%', count: '584 bài' },
      { label: 'T5', height: '55%', count: '382 bài' },
      { label: 'T6', height: '95%', count: '674 bài' },
      { label: 'T7', height: '40%', count: '281 bài' },
      { label: 'CN', height: '30%', count: '210 bài' }
    ],
    week: [
      { label: 'T2', height: '45%', count: '2,840 bài' },
      { label: 'T3', height: '65%', count: '3,120 bài' },
      { label: 'T4', height: '55%', count: '2,900 bài' },
      { label: 'T5', height: '80%', count: '3,850 bài' },
      { label: 'T6', height: '70%', count: '3,410 bài' },
      { label: 'T7', height: '90%', count: '4,200 bài' },
      { label: 'CN', height: '60%', count: '2,950 bài' }
    ]
  };

  // Lọc danh sách hoạt động dựa trên từ khóa tìm kiếm
  const filteredActivities = mockActivities.filter(activity => 
    activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout pageTitle="Tổng quan hệ thống">
      {/* Dashboard Body */}
      <div className="db-body">
        
        {/* Stats Metrics Grid */}
        <div className="db-stats-grid">
          
          <div className="db-stat-card">
            <div className="db-stat-icon-container blue">
              <MdPeople />
            </div>
            <div className="db-stat-content">
              <span className="db-stat-label">Tổng người dùng</span>
              <h3 className="db-stat-value">12,480</h3>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon-container green">
              <MdQuiz />
            </div>
            <div className="db-stat-content">
              <span className="db-stat-label">Tổng đề thi</span>
              <h3 className="db-stat-value">3,125</h3>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon-container warning">
              <MdCheckCircle />
            </div>
            <div className="db-stat-content">
              <span className="db-stat-label">Bài nộp hôm nay</span>
              <h3 className="db-stat-value">452</h3>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon-container purple">
              <MdTrendingUp />
            </div>
            <div className="db-stat-content">
              <span className="db-stat-label">Bài nộp tuần này</span>
              <h3 className="db-stat-value">2,840</h3>
            </div>
          </div>

        </div>

        {/* Charts Section */}
        <div className="db-charts-grid">
          
          {/* Bar Chart - Column Chart */}
          <div className="db-chart-card col-span-2">
            <div className="db-chart-header">
              <div className="db-chart-title-wrapper">
                <h4 className="db-chart-title">Số bài thi 7 ngày qua</h4>
                <p className="db-chart-desc">Theo dõi lưu lượng làm bài của học sinh</p>
              </div>
              <div className="db-chart-toggle">
                <button 
                  className={`db-toggle-btn ${chartPeriod === 'day' ? 'active' : ''}`}
                  onClick={() => setChartPeriod('day')}
                >
                  Ngày
                </button>
                <button 
                  className={`db-toggle-btn ${chartPeriod === 'week' ? 'active' : ''}`}
                  onClick={() => setChartPeriod('week')}
                >
                  Tuần
                </button>
              </div>
            </div>

            <div className="db-bar-chart-container">
              {barChartData[chartPeriod].map((bar, index) => (
                <div key={index} className="db-bar-column">
                  <div className="db-bar-track">
                    <div 
                      className="db-bar-fill" 
                      style={{ height: bar.height }}
                    >
                      <span className="db-bar-tooltip">{bar.count}</span>
                    </div>
                  </div>
                  <span className="db-bar-label">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut Chart - Role Distribution */}
          <div className="db-chart-card">
            <h4 className="db-chart-title">Phân bố vai trò</h4>
            <p className="db-chart-desc" style={{ marginBottom: '16px' }}>Cơ cấu người dùng</p>

            <div className="db-donut-wrapper">
              <svg className="db-donut-svg">
                <circle 
                  cx="90" 
                  cy="90" 
                  r="70" 
                  className="db-donut-circle-bg"
                />
                {/* Blue segment: 70% of 439.8 = 308 */}
                <circle 
                  cx="90" 
                  cy="90" 
                  r="70" 
                  className="db-donut-circle blue"
                  strokeDasharray="308 440"
                  strokeDashoffset="0"
                />
                {/* Green segment: 25% of 439.8 = 110 */}
                <circle 
                  cx="90" 
                  cy="90" 
                  r="70" 
                  className="db-donut-circle green"
                  strokeDasharray="110 440"
                  strokeDashoffset="-308"
                />
                {/* Warning (Amber) segment: 5% of 439.8 = 22 */}
                <circle 
                  cx="90" 
                  cy="90" 
                  r="70" 
                  className="db-donut-circle warning"
                  strokeDasharray="22 440"
                  strokeDashoffset="-418"
                />
              </svg>
              <div className="db-donut-center-text">
                <span className="db-donut-number">12.4k</span>
                <span className="db-donut-label">Tổng số</span>
              </div>
            </div>

            <div className="db-legend-container">
              <div className="db-legend-item">
                <div className="db-legend-left">
                  <div className="db-legend-dot warning"></div>
                  <span className="db-legend-name">Quản trị viên</span>
                </div>
                <span className="db-legend-percentage">5%</span>
              </div>
              <div className="db-legend-item">
                <div className="db-legend-left">
                  <div className="db-legend-dot green"></div>
                  <span className="db-legend-name">Giáo viên</span>
                </div>
                <span className="db-legend-percentage">25%</span>
              </div>
              <div className="db-legend-item">
                <div className="db-legend-left">
                  <div className="db-legend-dot blue"></div>
                  <span className="db-legend-name">Học sinh</span>
                </div>
                <span className="db-legend-percentage">70%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Recent Activity Section */}
        <div className="db-activity-section">
          <div className="db-activity-header">
            <h4 className="db-activity-title">Hoạt động gần đây</h4>
            <button className="db-view-all-btn" onClick={() => alert('Đang tải tất cả các hoạt động...')}>
              Xem tất cả
            </button>
          </div>

          <div className="db-table-responsive">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Người dùng</th>
                  <th>Hoạt động</th>
                  <th>Đối tượng</th>
                  <th style={{ textAlign: 'right' }}>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>
                        <div className="db-user-cell">
                          <img 
                            className="db-user-avatar" 
                            src={activity.avatar} 
                            alt={activity.name} 
                          />
                          <span className="db-user-name">{activity.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`db-badge ${activity.badgeClass}`}>
                          {activity.action}
                        </span>
                      </td>
                      <td>{activity.target}</td>
                      <td className="db-time-cell">{activity.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: 'var(--db-text-muted)' }}>
                      Không tìm thấy kết quả phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}