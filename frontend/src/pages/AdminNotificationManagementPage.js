import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import {
  FaGraduationCap,
  FaUsers,
  FaBookOpen,
  FaSchool,
  FaBullhorn,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaPaperPlane,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaClock,
  FaEye,
  FaUser,
  FaBars,
  FaTimes,
  FaSave,
  FaCheckCircle,
  FaThLarge,
  FaBell,
  FaQuestionCircle,
  FaPlus
} from 'react-icons/fa';
import '../styles/AdminNotificationManagement.css';

// Mock Initial Data
const initialNotifications = [
  {
    id: 1,
    title: 'Cập nhật kỳ thi học kỳ 1',
    status: 'success',
    statusLabel: 'Thành công',
    content: 'Tất cả các đề thi cho khối THPT đã được cập nhật đáp án chi tiết và giải thích bài tập. Học sinh có thể xem lại kết quả ngay sau khi hoàn thành bài thi thử.',
    time: '12:30 - 20/05/2024',
    views: '1,240',
    sender: 'Admin Lê Anh',
    pinned: false,
    draft: false
  },
  {
    id: 2,
    title: 'Bảo trì máy chủ trung tâm',
    status: 'pinned',
    statusLabel: 'Đã ghim',
    content: 'Hệ thống sẽ tạm ngưng hoạt động để nâng cấp hạ tầng từ 00:00 đến 04:00 sáng mai. Vui lòng hoàn thành các bài thi đang dở dang trước thời gian này.',
    time: '09:00 - 18/05/2024',
    views: '3,500',
    sender: 'Admin Nguyễn V.',
    pinned: true,
    draft: false
  },
  {
    id: 3,
    title: 'Khai mạc ngày hội sáng tạo công nghệ EduQuiz 2026',
    status: 'success',
    statusLabel: 'Thành công',
    content: 'Ngày hội lập trình và thử thách trắc nghiệm tư duy sẽ được khai mạc vào ngày 25/07 tới đây. Hứa hẹn nhiều phần quà vô cùng hấp dẫn đang đón chờ các em.',
    time: '08:30 - 12/05/2024',
    views: '890',
    sender: 'Admin Lê Anh',
    pinned: false,
    draft: false
  }
];

export default function AdminNotificationManagementPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filterTab, setFilterTab] = useState('all'); // all, pinned, draft
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [pinHome, setPinHome] = useState(false);
  const [pushNotification, setPushNotification] = useState(true);
  
  // Edit mode
  const [editingId, setEditingId] = useState(null);

  // Success toast state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCreateOrUpdate = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      triggerToast('Vui lòng điền đầy đủ tiêu đề và nội dung!');
      return;
    }

    if (editingId !== null) {
      // Update existing
      setNotifications(prev =>
        prev.map(notif => {
          if (notif.id === editingId) {
            return {
              ...notif,
              title,
              content,
              pinned: pinHome,
              status: pinHome ? 'pinned' : 'success',
              statusLabel: pinHome ? 'Đã ghim' : 'Thành công',
            };
          }
          return notif;
        })
      );
      triggerToast('Cập nhật thông báo thành công!');
      setEditingId(null);
    } else {
      // Create new
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} - ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      
      const newNotif = {
        id: Date.now(),
        title,
        status: pinHome ? 'pinned' : 'success',
        statusLabel: pinHome ? 'Đã ghim' : 'Thành công',
        content,
        time: timeStr,
        views: '0',
        sender: 'Quản trị viên',
        pinned: pinHome,
        draft: false
      };

      setNotifications([newNotif, ...notifications]);
      triggerToast('Đã gửi thông báo mới thành công!');
    }

    // Reset Form
    setTitle('');
    setContent('');
    setSendEmail(false);
    setPinHome(false);
    setPushNotification(true);
  };

  const handleEdit = (notif) => {
    setEditingId(notif.id);
    setTitle(notif.title);
    setContent(notif.content);
    setPinHome(notif.pinned);
    // Scroll to form smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerToast('Đang chỉnh sửa thông báo...');
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    triggerToast('Đã xóa thông báo thành công!');
    if (editingId === id) {
      setEditingId(null);
      setTitle('');
      setContent('');
      setPinHome(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setSendEmail(false);
    setPinHome(false);
    setPushNotification(true);
    triggerToast('Đã hủy soạn thảo!');
  };

  // Filter & Search logic
  const filteredNotifications = notifications.filter(notif => {
    // Tab filter
    if (filterTab === 'pinned' && !notif.pinned) return false;
    if (filterTab === 'draft' && !notif.draft) return false;

    // Search Query filter
    const matchesSearch = 
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <AdminLayout pageTitle="Quản lý Thông báo" pageSubtitle="Gửi thông tin cập nhật và quản lý danh sách thông báo trên toàn hệ thống.">
      {/* Workspace Body */}
      <main className="page-body">
        {/* Create Notification Panel */}
        <section className="management-panel">
          <div className="panel-header">
            <h3>
              <span className="panel-header-icon"><FaBullhorn /></span>
              {editingId !== null ? 'Chỉnh sửa thông báo' : 'Tạo thông báo mới'}
            </h3>
            <span className="header-tag">Gửi toàn hệ thống</span>
          </div>
          <div className="panel-body">
            <form onSubmit={handleCreateOrUpdate}>
              <div className="form-group">
                <label className="form-label">Tiêu đề thông báo</label>
                <input 
                  type="text" 
                  placeholder="Nhập tiêu đề ngắn gọn (VD: Lịch nghỉ lễ Quốc khánh 2/9)" 
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nội dung chi tiết</label>
                <textarea 
                  placeholder="Nhập nội dung thông báo cho người dùng..." 
                  className="form-input form-textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              <div className="form-footer">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="checkbox-input"
                      checked={sendEmail}
                      onChange={(e) => setSendEmail(e.target.checked)}
                    />
                    <span>Gửi qua Email</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="checkbox-input"
                      checked={pinHome}
                      onChange={(e) => setPinHome(e.target.checked)}
                    />
                    <span>Ghim lên đầu trang chủ</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      className="checkbox-input"
                      checked={pushNotification}
                      onChange={(e) => setPushNotification(e.target.checked)}
                    />
                    <span>Thông báo đẩy (Push Notification)</span>
                  </label>
                </div>

                <button type="submit" className="submit-btn">
                  <span className="btn-icon"><FaPaperPlane /></span>
                  <span>{editingId !== null ? 'Cập nhật ngay' : 'Gửi thông báo ngay'}</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* List Section */}
        <section className="management-panel">
          <div className="panel-header">
            <h3>
              <span className="panel-header-icon"><FaBullhorn /></span>
              Danh sách thông báo đã gửi
            </h3>
            <div className="filter-wrapper">
              <div className="filter-pills">
                <button 
                  className={`filter-pill ${filterTab === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterTab('all')}
                >
                  Tất cả
                </button>
                <button 
                  className={`filter-pill ${filterTab === 'pinned' ? 'active' : ''}`}
                  onClick={() => setFilterTab('pinned')}
                >
                  Đã ghim
                </button>
                <button 
                  className={`filter-pill ${filterTab === 'draft' ? 'active' : ''}`}
                  onClick={() => setFilterTab('draft')}
                >
                  Bản nháp
                </button>
              </div>
              <a href="#view-all" className="view-all-link" onClick={(e) => { e.preventDefault(); triggerToast('Đang tải toàn bộ dữ liệu thông báo...'); }}>
                Xem tất cả &rarr;
              </a>
            </div>
          </div>

          <div className="notification-list">
            {filteredNotifications.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-light)', fontSize: '14px' }}>
                Không tìm thấy thông báo phù hợp.
              </div>
            ) : (
              filteredNotifications.map(notif => (
                <div key={notif.id} className="notification-item">
                  <div className="item-left">
                    <div className={`item-status-icon ${notif.pinned ? 'pinned' : 'success'}`}>
                      {notif.pinned ? <FaBullhorn /> : <FaCheckCircle />}
                    </div>
                    <div className="item-details">
                      <div className="item-title-row">
                        <h4 className="item-title">{notif.title}</h4>
                        <span className={`status-badge ${notif.pinned ? 'pinned' : 'success'}`}>
                          {notif.statusLabel}
                        </span>
                      </div>
                      <p className="item-content">{notif.content}</p>
                      <div className="item-meta">
                        <div className="meta-group">
                          <span className="meta-icon"><FaClock /></span>
                          <span>{notif.time}</span>
                        </div>
                        <div className="meta-group">
                          <span className="meta-icon"><FaEye /></span>
                          <span>{notif.views} lượt xem</span>
                        </div>
                        <div className="meta-group">
                          <span className="meta-icon"><FaUser /></span>
                          <span>Bởi: {notif.sender}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="item-actions">
                    <button 
                      className="action-btn" 
                      title="Chỉnh sửa"
                      onClick={() => handleEdit(notif)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn" 
                      title="Xóa"
                      onClick={() => handleDelete(notif.id)}
                    >
                      <FaTrash />
                    </button>
                    <button 
                      className="action-btn" 
                      title="Tùy chọn khác"
                      onClick={() => triggerToast('Tính năng bổ sung đang phát triển')}
                    >
                      <FaEllipsisV />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={() => triggerToast('Hệ thống đã tải tất cả thông báo hiện có.')}
            >
              Tải thêm thông báo cũ hơn
            </button>
          </div>
        </section>

        {/* Bottom Action bar */}
        <div className="page-footer-bar">
          <p className="footer-notice">
            * Các thông báo ghim sẽ tự động hiển thị nổi bật trên Dashboard của học sinh và giáo viên.
          </p>
          <div className="footer-actions">
            <button className="cancel-btn" onClick={handleCancelEdit}>
              Hủy soạn thảo
            </button>
            <button className="save-config-btn" onClick={() => triggerToast('Đã lưu cấu hình thông báo lên hệ thống!')}>
              <span className="btn-icon"><FaSave /></span>
              Lưu cấu hình thông báo
            </button>
          </div>
        </div>
      </main>

      {/* Floating alert toast */}
      {showToast && (
        <div className="alert-toast">
          <FaCheckCircle style={{ fontSize: '18px' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </AdminLayout>
  );
}