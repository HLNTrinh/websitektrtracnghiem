import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import '../styles/AdminUserManagement.css';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  LogOut, 
  Settings, 
  UserPlus, 
  SlidersHorizontal, 
  Eye, 
  EyeOff,
  Edit, 
  Lock, 
  Unlock, 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Layers, 
  Menu, 
  X, 
  Plus, 
  ArrowUpRight, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Pre-defined stable avatar images for high-fidelity look and feel
const AVATARS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop', // Female Teacher
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop', // Male Student
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop', // Male Admin
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=150&auto=format&fit=crop', // Female Student 1
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop', // Male Teacher 2
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop', // Female Student 2
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', // Male Student 2
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop', // Female Admin 2
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop', // Male Teacher 3
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'  // Female Student 3
];

const INITIAL_USERS = [
  {
    id: '#USR-8291',
    fullName: 'Nguyễn Lan Anh',
    email: 'lananh.edu@gmail.com',
    role: 'Giáo viên',
    status: 'Hoạt động',
    createdDate: '12/10/2023',
    avatar: AVATARS[0],
    phone: '0912 345 678',
    gender: 'Nữ',
    schoolClass: 'Sư phạm Văn K45',
    password: 'LanAnh@2023'
  },
  {
    id: '#USR-8290',
    fullName: 'Trần Minh Hoàng',
    email: 'hoangtm.student@edu.vn',
    role: 'Học sinh',
    status: 'Hoạt động',
    createdDate: '08/10/2023',
    avatar: AVATARS[1],
    phone: '0987 654 321',
    gender: 'Nam',
    schoolClass: 'Lớp 12A1',
    password: 'Hoang123@'
  },
  {
    id: '#USR-8285',
    fullName: 'Lê Văn Hùng',
    email: 'hunglv@edu.vn',
    role: 'Quản trị viên',
    status: 'Đã khóa',
    createdDate: '15/09/2023',
    avatar: AVATARS[2],
    phone: '0903 111 222',
    gender: 'Nam',
    schoolClass: 'Phòng Đào tạo',
    password: 'HungLV@2023'
  },
  {
    id: '#USR-8280',
    fullName: 'Phạm Thu Trang',
    email: 'trangpt.stu@edu.vn',
    role: 'Học sinh',
    status: 'Hoạt động',
    createdDate: '01/09/2023',
    avatar: AVATARS[3],
    phone: '0934 555 666',
    gender: 'Nữ',
    schoolClass: 'Lớp 11B3',
    password: 'Trang@123'
  },
  {
    id: '#USR-8275',
    fullName: 'Đặng Hoàng Giang',
    email: 'giangdh.teacher@edu.vn',
    role: 'Giáo viên',
    status: 'Hoạt động',
    createdDate: '28/08/2023',
    avatar: AVATARS[4],
    phone: '0915 222 333',
    gender: 'Nam',
    schoolClass: 'Sư phạm Toán K43',
    password: 'GiangDH@123'
  },
  {
    id: '#USR-8270',
    fullName: 'Vũ Mỹ Linh',
    email: 'linhvm.student@gmail.com',
    role: 'Học sinh',
    status: 'Hoạt động',
    createdDate: '15/08/2023',
    avatar: AVATARS[5],
    phone: '0978 999 000',
    gender: 'Nữ',
    schoolClass: 'Lớp 10C2',
    password: 'Mylinh@123'
  },
  {
    id: '#USR-8265',
    fullName: 'Ngô Quốc Bảo',
    email: 'baonq.student@edu.vn',
    role: 'Học sinh',
    status: 'Đã khóa',
    createdDate: '10/08/2023',
    avatar: AVATARS[6],
    phone: '0966 444 333',
    gender: 'Nam',
    schoolClass: 'Lớp 12A5',
    password: 'QuocBao@123'
  },
  {
    id: '#USR-8260',
    fullName: 'Hoàng Thùy Dương',
    email: 'duonght.admin@eduquiz.vn',
    role: 'Quản trị viên',
    status: 'Hoạt động',
    createdDate: '01/08/2023',
    avatar: AVATARS[7],
    phone: '0909 888 777',
    gender: 'Nữ',
    schoolClass: 'Ban Giám hiệu',
    password: 'DuongHT@123'
  },
  {
    id: '#USR-8255',
    fullName: 'Phan Văn Khải',
    email: 'khaipv.teacher@gmail.com',
    role: 'Giáo viên',
    status: 'Hoạt động',
    createdDate: '20/07/2023',
    avatar: AVATARS[8],
    phone: '0914 777 888',
    gender: 'Nam',
    schoolClass: 'Tổ Vật Lý',
    password: 'VanKhai@123'
  },
  {
    id: '#USR-8250',
    fullName: 'Bùi Phương Thảo',
    email: 'thaobp.student@edu.vn',
    role: 'Học sinh',
    status: 'Hoạt động',
    createdDate: '12/07/2023',
    avatar: AVATARS[9],
    phone: '0945 111 000',
    gender: 'Nữ',
    schoolClass: 'Lớp 11A2',
    password: 'PhuongThao@123'
  }
];

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('Tất cả vai trò');
  const [statusFilter, setStatusFilter] = useState('Tất cả trạng thái');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // Selected / Edit user state
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  // Form input state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Học sinh',
    status: 'Hoạt động',
    phone: '',
    gender: 'Nam',
    schoolClass: '',
    password: ''
  });

  const showToast = (message) => {
    setToast(message);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add User
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      showToast('Vui lòng điền đầy đủ Họ tên và Email!');
      return;
    }

    const randomIdNumber = Math.floor(1000 + Math.random() * 9000);
    const randomAvatarIndex = Math.floor(Math.random() * AVATARS.length);
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const newUser = {
      id: `#USR-${randomIdNumber}`,
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      createdDate: formattedDate,
      avatar: AVATARS[randomAvatarIndex],
      phone: formData.phone || 'Chưa cập nhật',
      gender: formData.gender,
      schoolClass: formData.schoolClass || 'Chưa cập nhật',
      password: formData.password || '123456'
    };

    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
    resetForm();
    showToast(`Đã thêm thành công người dùng ${newUser.fullName}!`);
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone || '',
      gender: user.gender || 'Nam',
      schoolClass: user.schoolClass || '',
      password: user.password || ''
    });
    setIsEditModalOpen(true);
  };

  // Save Edit User
  const handleEditUser = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      showToast('Vui lòng điền đầy đủ Họ tên và Email!');
      return;
    }

    setUsers(users.map(u => {
      if (u.id === selectedUser.id) {
        return {
          ...u,
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          phone: formData.phone,
          gender: formData.gender,
          schoolClass: formData.schoolClass,
          password: formData.password || selectedUser.password
        };
      }
      return u;
    }));

    setIsEditModalOpen(false);
    resetForm();
    showToast(`Đã cập nhật thông tin người dùng ${formData.fullName}!`);
  };

  // Toggle Lock/Unlock User
  const toggleUserLock = (user) => {
    const newStatus = user.status === 'Hoạt động' ? 'Đã khóa' : 'Hoạt động';
    setUsers(users.map(u => {
      if (u.id === user.id) {
        return { ...u, status: newStatus };
      }
      return u;
    }));
    showToast(`Đã ${newStatus === 'Đã khóa' ? 'khóa' : 'mở khóa'} tài khoản của ${user.fullName}`);
  };

  // Open Detail Modal
  const openDetailModal = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      role: 'Học sinh',
      status: 'Hoạt động',
      phone: '',
      gender: 'Nam',
      schoolClass: '',
      password: ''
    });
    setSelectedUser(null);
  };

  // Filter Logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'Tất cả vai trò' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'Tất cả trạng thái' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination calculations
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // If filtered lists shrink, adjust page count so it doesn't stay out of bounds
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredUsers, totalPages, currentPage]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setRoleFilter('Tất cả vai trò');
    setStatusFilter('Tất cả trạng thái');
    setCurrentPage(1);
    showToast('Đã đặt lại các bộ lọc tìm kiếm');
  };

  return (
    <AdminLayout pageTitle="Quản lý người dùng" pageSubtitle="Xem, tìm kiếm và quản lý phân quyền cho tất cả thành viên trong hệ thống.">
      {/* Header section with Title and CTA */}
      <div className="page-intro-section">
        <button className="add-user-primary-btn" onClick={() => { resetForm(); setIsAddModalOpen(true); }}>
          <UserPlus size={18} />
          <span>Thêm người dùng mới</span>
        </button>
      </div>

      {/* Filters & Statistics Dashboard Block */}
      <div className="dashboard-top-grid">
        <div className="filters-container-card">
          <div className="filters-row">
            <div className="filter-group search-detail">
              <label className="filter-label">Tìm kiếm chi tiết</label>
              <div className="filter-input-wrapper">
                <Search className="filter-search-icon" />
                <input 
                  type="text" 
                  placeholder="Tên, email hoặc ID..." 
                  className="filter-text-input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Vai trò</label>
              <select 
                className="filter-select"
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>Tất cả vai trò</option>
                <option>Quản trị viên</option>
                <option>Giáo viên</option>
                <option>Học sinh</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Trạng thái</label>
              <select 
                className="filter-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>Tất cả trạng thái</option>
                <option>Hoạt động</option>
                <option>Đã khóa</option>
              </select>
            </div>

            {(searchQuery || roleFilter !== 'Tất cả vai trò' || statusFilter !== 'Tất cả trạng thái') && (
              <button 
                className="clear-filters-btn" 
                title="Đặt lại bộ lọc"
                onClick={clearAllFilters}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Side Blue Stat Card */}
        <div className="stats-info-card">
          <div>
            <p className="stats-card-label">Tổng người dùng</p>
            <h3 className="stats-card-value">{users.length}</h3>
          </div>
          <div className="stats-card-trend">
            <ArrowUpRight size={13} />
            <span>+12% so với tháng trước</span>
          </div>
        </div>
      </div>

      {/* Table Container Card */}
      <div className="table-data-card">
        <div className="table-responsive-container">
          <table className="users-list-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ tên & Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th style={{ textAlign: 'right' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="user-id-cell">{user.id}</td>
                    <td>
                      <div className="user-profile-cell">
                        <img src={user.avatar} alt={user.fullName} className="table-user-avatar" />
                        <div className="user-profile-info">
                          <p className="user-full-name">{user.fullName}</p>
                          <p className="user-email">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge-role ${
                        user.role === 'Quản trị viên' ? 'admin' : 
                        user.role === 'Giáo viên' ? 'teacher' : 'student'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`status-indicator ${user.status === 'Hoạt động' ? 'active' : 'locked'}`}>
                        <span className={`status-dot ${user.status === 'Hoạt động' ? 'active' : 'locked'}`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="date-text">{user.createdDate}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-buttons-group">
                        <button 
                          className="table-action-btn view" 
                          title="Xem chi tiết"
                          onClick={() => openDetailModal(user)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="table-action-btn edit" 
                          title="Chỉnh sửa"
                          onClick={() => openEditModal(user)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className={`table-action-btn ${user.status === 'Hoạt động' ? 'lock' : 'unlock'}`} 
                          title={user.status === 'Hoạt động' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                          onClick={() => toggleUserLock(user)}
                        >
                          {user.status === 'Hoạt động' ? <Lock size={16} /> : <Unlock size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--text-light)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={28} />
                      <p style={{ margin: 0, fontWeight: 600 }}>Không tìm thấy người dùng nào phù hợp</p>
                      <p style={{ margin: 0, fontSize: '13px' }}>Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls bar */}
        <div className="pagination-section-bar">
          <p className="pagination-stats">
            Hiển thị <span>{totalItems === 0 ? 0 : indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)}</span> trong số <span>{totalItems}</span> người dùng
          </p>
          <div className="pagination-buttons">
            <button 
              className="page-arrow-btn" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button 
                key={pageNum}
                className={`page-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            ))}

            <button 
              className="page-arrow-btn" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Thêm người dùng mới</h3>
              <button className="close-modal-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="modal-body">
                <div className="modal-form">
                  <div className="form-field">
                    <label className="form-label">Họ và tên *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nhập họ và tên đầy đủ" 
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Địa chỉ Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập địa chỉ email người dùng" 
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Số điện thoại</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại" 
                      className="form-input"
                    />
                  </div>
            
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-field">
                      <label className="form-label">Vai trò</label>
                      <select 
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option>Học sinh</option>
                        <option>Giáo viên</option>
                        <option>Quản trị viên</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label className="form-label">Giới tính</label>
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Lớp học / Ban ngành</label>
                    <input 
                      type="text" 
                      name="schoolClass"
                      value={formData.schoolClass}
                      onChange={handleInputChange}
                      placeholder="Ví dụ: Lớp 12A1, Phòng Đào tạo" 
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Mật khẩu</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Nhập mật khẩu"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>Hủy bỏ</button>
                <button type="submit" className="btn-primary">Tạo tài khoản</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chỉnh sửa tài khoản</h3>
              <button className="close-modal-btn" onClick={() => setIsEditModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditUser}>
              <div className="modal-body">
                <div className="modal-form">
                  <div className="form-field">
                    <label className="form-label">Họ và tên *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nhập họ và tên đầy đủ" 
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Địa chỉ Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập địa chỉ email" 
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Số điện thoại</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại" 
                      className="form-input"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-field">
                      <label className="form-label">Vai trò</label>
                      <select 
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option>Học sinh</option>
                        <option>Giáo viên</option>
                        <option>Quản trị viên</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label className="form-label">Giới tính</label>
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Lớp học / Ban ngành</label>
                    <input 
                      type="text" 
                      name="schoolClass"
                      value={formData.schoolClass}
                      onChange={handleInputChange}
                      placeholder="Ví dụ: Lớp 12A1, Phòng Đào tạo" 
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Mật khẩu hiện tại</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                      <input 
                        type={showCurrentPassword ? 'text' : 'password'}
                        className="form-input"
                        value={showCurrentPassword ? selectedUser?.password || '' : '●●●●●●●●'}
                        style={{ flex: 1 }}
                        disabled
                      />
                      <button
                        type="button"
                        className="btn-icon-eye"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        title={showCurrentPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          background: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#64748b',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Mật khẩu mới</label>
                    <input 
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Nhập mật khẩu mới (để trống nếu không đổi)" 
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsEditModalOpen(false)}>Hủy bỏ</button>
                <button type="submit" className="btn-primary">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {isDetailModalOpen && selectedUser && (
        <div className="modal-overlay-backdrop" onClick={() => setIsDetailModalOpen(false)}>
          <div className="modal-content-card detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi tiết người dùng</h3>
              <button className="close-modal-btn" onClick={() => setIsDetailModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-profile-header">
                <img src={selectedUser.avatar} alt={selectedUser.fullName} className="detail-avatar-large" />
                <h4>{selectedUser.fullName}</h4>
                <p>{selectedUser.email}</p>
                <span className={`badge-role ${
                  selectedUser.role === 'Quản trị viên' ? 'admin' : 
                  selectedUser.role === 'Giáo viên' ? 'teacher' : 'student'
                }`}>
                  {selectedUser.role}
                </span>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Mã số tài khoản:</span>
                  <span className="info-value">{selectedUser.id}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Số điện thoại:</span>
                  <span className="info-value">{selectedUser.phone || 'Chưa cập nhật'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Giới tính:</span>
                  <span className="info-value">{selectedUser.gender || 'Chưa cập nhật'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Lớp học / Ban ngành:</span>
                  <span className="info-value">{selectedUser.schoolClass || 'Chưa cập nhật'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Trạng thái:</span>
                  <span className={`status-indicator ${selectedUser.status === 'Hoạt động' ? 'active' : 'locked'}`}>
                    <span className={`status-dot ${selectedUser.status === 'Hoạt động' ? 'active' : 'locked'}`}></span>
                    {selectedUser.status}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Mật khẩu:</span>
                  <span className="info-value">••••••••</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ngày đăng ký hệ thống:</span>
                  <span className="info-value">{selectedUser.createdDate}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setIsDetailModalOpen(false)}>Đóng lại</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Feedback Notification (Toast) */}
      {toast && (
        <div className="toast-notification">
          <CheckCircle size={16} />
          <span>{toast}</span>
        </div>
      )}
    </AdminLayout>
  );
}