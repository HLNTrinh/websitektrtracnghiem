import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import {
  School,
  User,
  Calendar,
  Edit3,
  Trash2,
  UploadCloud,
  UserPlus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  FileSpreadsheet,
  Search,
  CheckCircle,
  Users,
  Bell,
  HelpCircle
} from 'lucide-react';
import '../styles/AdminClassManagementContent.css';

const initialClassList = [
  {
    id: 1,
    name: "Lớp 12A1 - Chuyên Toán",
    teacher: "Nguyễn Văn Nam",
    studentCount: 32,
    year: "2023 - 2024",
    status: "Đang hoạt động",
    stats: {
      totalStudents: 32,
      classGpa: 8.4,
      completedExams: 124,
      attendanceRate: "98%"
    },
    students: [
      { id: "HS001", name: "An Tú Anh", dob: "12/05/2006", gpa: 9.2, status: "Online", initial: "AT", bgClass: "bg-blue" },
      { id: "HS002", name: "Bùi Thanh Tùng", dob: "24/08/2006", gpa: 8.5, status: "Offline", initial: "BT", bgClass: "bg-orange" },
      { id: "HS003", name: "Chu Duy Anh", dob: "15/02/2006", gpa: 7.8, status: "Online", initial: "CD", bgClass: "bg-purple" },
      { id: "HS004", name: "Đào Thu Thảo", dob: "03/11/2006", gpa: 9.0, status: "Online", initial: "DT", bgClass: "bg-teal" },
      { id: "HS005", name: "Giang Tuấn Kiệt", dob: "19/07/2006", gpa: 8.1, status: "Online", initial: "GK", bgClass: "bg-pink" },
      { id: "HS006", name: "Hoàng Minh Khôi", dob: "28/01/2006", gpa: 8.8, status: "Offline", initial: "MK", bgClass: "bg-green" }
    ],
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    ],
    extraCount: 30
  },
  {
    id: 2,
    name: "Lớp 12A2 - Chuyên Lý",
    teacher: "Trần Thị Thu Hà",
    studentCount: 30,
    year: "2023 - 2024",
    status: "Đang hoạt động",
    stats: {
      totalStudents: 30,
      classGpa: 8.1,
      completedExams: 112,
      attendanceRate: "97%"
    },
    students: [
      { id: "HS020", name: "Lý Gia Bảo", dob: "01/09/2006", gpa: 8.9, status: "Online", initial: "GB", bgClass: "bg-teal" },
      { id: "HS021", name: "Mai Phương Thảo", dob: "14/10/2006", gpa: 7.5, status: "Online", initial: "PT", bgClass: "bg-pink" },
      { id: "HS022", name: "Ngô Anh Dũng", dob: "22/12/2006", gpa: 8.2, status: "Offline", initial: "AD", bgClass: "bg-blue" },
      { id: "HS023", name: "Phạm Ngọc Diệp", dob: "05/03/2006", gpa: 9.1, status: "Online", initial: "ND", bgClass: "bg-orange" }
    ],
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
    ],
    extraCount: 28
  },
  {
    id: 3,
    name: "Lớp 11B3 - Cơ bản",
    teacher: "Lê Minh Hoàng",
    studentCount: 45,
    year: "2023 - 2024",
    status: "Tạm dừng",
    stats: {
      totalStudents: 45,
      classGpa: 7.2,
      completedExams: 160,
      attendanceRate: "95%"
    },
    students: [
      { id: "HS040", name: "Nguyễn Minh Triết", dob: "11/04/2007", gpa: 7.4, status: "Online", initial: "MT", bgClass: "bg-purple" },
      { id: "HS041", name: "Trần Bảo Trâm", dob: "30/08/2007", gpa: 8.0, status: "Offline", initial: "BT", bgClass: "bg-green" },
      { id: "HS042", name: "Vũ Đình Phong", dob: "17/11/2007", gpa: 6.8, status: "Online", initial: "DP", bgClass: "bg-blue" }
    ],
    avatars: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
    ],
    extraCount: 44
  }
];

export default function AdminClassManagementPage() {
  const [classes, setClasses] = useState(initialClassList);
  const [selectedClassId, setSelectedClassId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  
  // Modals state
  const [showAddClass, setShowAddClass] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditClass, setShowEditClass] = useState(false);
  
  // Form states for class
  const [newClassName, setNewClassName] = useState('');
  const [newClassTeacher, setNewClassTeacher] = useState('');
  const [newClassYear, setNewClassYear] = useState('2023 - 2024');
  
  // Form states for student
  const [newStudentCode, setNewStudentCode] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentDob, setNewStudentDob] = useState('');
  const [newStudentGpa, setNewStudentGpa] = useState('');
  const [newStudentStatus, setNewStudentStatus] = useState('Online');

  // Edit class state
  const [editClassName, setEditClassName] = useState('');
  const [editClassTeacher, setEditClassTeacher] = useState('');
  const [editClassYear, setEditClassYear] = useState('');
  const [editClassStatus, setEditClassStatus] = useState('');

  // Active Class Menu State
  const [activeMenuStudentId, setActiveMenuStudentId] = useState(null);

  // Active Class
  const activeClass = classes.find(c => c.id === selectedClassId) || classes[0];

  const handleAddClass = (e) => {
    e.preventDefault();
    if (!newClassName || !newClassTeacher) return;

    const newClassObj = {
      id: Date.now(),
      name: newClassName,
      teacher: newClassTeacher,
      studentCount: 0,
      year: newClassYear,
      status: "Đang hoạt động",
      stats: {
        totalStudents: 0,
        classGpa: 0,
        completedExams: 0,
        attendanceRate: "100%"
      },
      students: [],
      avatars: [],
      extraCount: 0
    };

    setClasses([...classes, newClassObj]);
    setSelectedClassId(newClassObj.id);
    setNewClassName('');
    setNewClassTeacher('');
    setShowAddClass(false);
  };

  const handleEditClassSubmit = (e) => {
    e.preventDefault();
    setClasses(classes.map(c => {
      if (c.id === selectedClassId) {
        return {
          ...c,
          name: editClassName,
          teacher: editClassTeacher,
          year: editClassYear,
          status: editClassStatus
        };
      }
      return c;
    }));
    setShowEditClass(false);
  };

  const handleOpenEditClass = () => {
    setEditClassName(activeClass.name);
    setEditClassTeacher(activeClass.teacher);
    setEditClassYear(activeClass.year);
    setEditClassStatus(activeClass.status);
    setShowEditClass(true);
  };

  const handleDeleteClass = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xoá lớp ${activeClass.name}?`)) {
      const remainingClasses = classes.filter(c => c.id !== selectedClassId);
      setClasses(remainingClasses);
      if (remainingClasses.length > 0) {
        setSelectedClassId(remainingClasses[0].id);
      }
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentCode || !newStudentName || !newStudentDob || !newStudentGpa) return;

    const initials = newStudentName
      .split(' ')
      .slice(-2)
      .map(n => n[0])
      .join('')
      .toUpperCase() || 'HS';

    const colors = ['bg-blue', 'bg-orange', 'bg-purple', 'bg-teal', 'bg-pink', 'bg-green'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newStudentObj = {
      id: newStudentCode,
      name: newStudentName,
      dob: newStudentDob,
      gpa: parseFloat(newStudentGpa) || 0,
      status: newStudentStatus,
      initial: initials,
      bgClass: randomColor
    };

    setClasses(classes.map(c => {
      if (c.id === selectedClassId) {
        const updatedStudents = [...c.students, newStudentObj];
        const newCount = updatedStudents.length;
        const totalGpa = updatedStudents.reduce((sum, s) => sum + s.gpa, 0);
        const avgGpa = parseFloat((totalGpa / newCount).toFixed(1));
        return {
          ...c,
          studentCount: newCount,
          stats: {
            ...c.stats,
            totalStudents: newCount,
            classGpa: avgGpa,
            completedExams: c.stats.completedExams + 4
          },
          students: updatedStudents,
          extraCount: Math.max(0, newCount - 2)
        };
      }
      return c;
    }));

    // Reset inputs
    setNewStudentCode('');
    setNewStudentName('');
    setNewStudentDob('');
    setNewStudentGpa('');
    setShowAddStudent(false);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm(`Bạn có chắc chắn muốn xoá học sinh này khỏi lớp?`)) {
      setClasses(classes.map(c => {
        if (c.id === selectedClassId) {
          const updatedStudents = c.students.filter(s => s.id !== studentId);
          const newCount = updatedStudents.length;
          const totalGpa = updatedStudents.reduce((sum, s) => sum + s.gpa, 0);
          const avgGpa = newCount > 0 ? parseFloat((totalGpa / newCount).toFixed(1)) : 0;
          return {
            ...c,
            studentCount: newCount,
            stats: {
              ...c.stats,
              totalStudents: newCount,
              classGpa: avgGpa
            },
            students: updatedStudents,
            extraCount: Math.max(0, newCount - 2)
          };
        }
        return c;
      }));
      setActiveMenuStudentId(null);
    }
  };

  // Filter Classes
  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter Students in Active Class
  const filteredStudents = activeClass ? activeClass.students.filter(s =>
    s.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(studentSearchQuery.toLowerCase())
  ) : [];

  return (
    <AdminLayout pageTitle="Quản lý lớp học" pageSubtitle="Theo dõi danh sách lớp, giáo viên và tình hình học tập của học sinh.">
      {/* Dashboard Content Container */}
      <div className="dashboard-content" id="dashboard-content-area">
        {/* Nút tạo lớp học */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <button 
            className="btn-primary" 
            onClick={() => setShowAddClass(true)}
            id="btn-create-new-class"
          >
            <Plus size={18} />
            <span>Tạo lớp học mới</span>
          </button>
        </div>

        {/* Grid Layout Section */}
        <div className="dashboard-grid" id="dashboard-grid-layout">
          
          {/* Left Column: Class List */}
          <div className="class-list-column" id="class-list-sidebar">
            <div className="column-header" id="class-column-header">
              <h3 className="column-title">Danh sách lớp</h3>
              <span className="counter-badge">{classes.length} Lớp</span>
            </div>

            <div className="class-cards-container" id="class-cards-list">
              {filteredClasses.length === 0 ? (
                <div className="empty-state">Không tìm thấy lớp học phù hợp</div>
              ) : (
                filteredClasses.map((item) => {
                  const isSelected = item.id === selectedClassId;
                  return (
                    <div 
                      key={item.id}
                      className={`class-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedClassId(item.id)}
                      id={`class-card-${item.id}`}
                    >
                      {isSelected && (
                        <div className="selected-indicator">
                          <CheckCircle size={14} className="check-icon" />
                        </div>
                      )}
                      <h4 className="class-card-name">{item.name}</h4>
                      
                      <div className="class-card-meta">
                        <div className="meta-item">
                          <User size={14} />
                          <span>GV: {item.teacher}</span>
                        </div>
                        <div className="meta-item">
                          <Users size={14} />
                          <span>{item.studentCount} Học sinh</span>
                        </div>
                      </div>

                      <div className="class-card-footer">
                        <div className="avatar-stack">
                          {item.avatars && item.avatars.map((url, idx) => (
                            <img 
                              key={idx} 
                              src={url} 
                              alt="Student Avatar" 
                              className="stack-avatar-img"
                            />
                          ))}
                          {item.extraCount > 0 && (
                            <div className="stack-avatar-more">+{item.extraCount}</div>
                          )}
                        </div>
                        {isSelected && <span className="status-label">Đang chọn</span>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Class Details & Student List */}
          <div className="class-details-column" id="class-details-panel">
            {activeClass ? (
              <>
                {/* Active Class Header Card */}
                <div className="active-class-hero" id="active-class-hero-card">
                  <div className="hero-main-info">
                    <div className="hero-left-block">
                      <div className="hero-icon-container">
                        <Users size={28} className="hero-icon-blue" />
                      </div>
                      <div className="hero-text-details">
                        <div className="hero-title-badge-row">
                          <h2 className="hero-class-name">{activeClass.name}</h2>
                          <span className={`badge-status ${activeClass.status === 'Đang hoạt động' ? 'active' : 'paused'}`}>
                            {activeClass.status}
                          </span>
                        </div>
                        <div className="hero-meta-row">
                          <div className="hero-meta-col">
                            <User size={16} />
                            <span>GV: {activeClass.teacher}</span>
                          </div>
                          <div className="hero-meta-col">
                            <Calendar size={16} />
                            <span>Năm học: {activeClass.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="hero-actions-container">
                      <button 
                        className="btn-outline-sm" 
                        onClick={handleOpenEditClass}
                        id="btn-edit-active-class"
                      >
                        Sửa lớp
                      </button>
                      <button 
                        className="btn-icon-danger" 
                        onClick={handleDeleteClass}
                        id="btn-delete-active-class"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Stats Dashboard */}
                  <div className="stats-dashboard-grid" id="stats-dashboard-chips">
                    <div className="stats-chip chip-blue">
                      <span className="stats-chip-title">Tổng học sinh</span>
                      <span className="stats-chip-value">{activeClass.stats.totalStudents}</span>
                    </div>
                    <div className="stats-chip chip-green">
                      <span className="stats-chip-title">Điểm TB lớp</span>
                      <span className="stats-chip-value">{activeClass.stats.classGpa}</span>
                    </div>
                    <div className="stats-chip chip-orange">
                      <span className="stats-chip-title">Bài thi hoàn thành</span>
                      <span className="stats-chip-value">{activeClass.stats.completedExams}</span>
                    </div>
                    <div className="stats-chip chip-purple">
                      <span className="stats-chip-title">Tỉ lệ chuyên cần</span>
                      <span className="stats-chip-value">{activeClass.stats.attendanceRate}</span>
                    </div>
                  </div>
                </div>

                {/* Student Table Container */}
                <div className="students-table-container" id="students-table-section">
                  <div className="table-header-row" id="students-table-header">
                    <h3 className="table-header-title">Danh sách học sinh</h3>
                    
                    <div className="table-filter-actions">
                      <div className="table-search-box">
                        <Search size={14} className="table-search-icon" />
                        <input 
                          type="text" 
                          placeholder="Tìm học sinh..." 
                          className="table-search-input"
                          value={studentSearchQuery}
                          onChange={(e) => setStudentSearchQuery(e.target.value)}
                          id="search-students-input"
                        />
                      </div>
                      <button className="btn-secondary-sm" id="btn-import-excel">
                        <FileSpreadsheet size={16} />
                        <span>Nhập từ Excel</span>
                      </button>
                      <button 
                        className="btn-primary-sm" 
                        onClick={() => setShowAddStudent(true)}
                        id="btn-add-new-student"
                      >
                        <UserPlus size={16} />
                        <span>Thêm học sinh</span>
                      </button>
                    </div>
                  </div>

                  {/* Desktop Responsive Table */}
                  <div className="table-scroller">
                    <table className="students-data-table">
                      <thead>
                        <tr>
                          <th>Mã số</th>
                          <th>Họ và tên</th>
                          <th>Ngày sinh</th>
                          <th>Điểm trung bình</th>
                          <th>Trạng thái</th>
                          <th className="text-right-aligned">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="table-empty-cell">Không tìm thấy học sinh nào trong lớp này</td>
                          </tr>
                        ) : (
                          filteredStudents.map((student) => (
                            <tr key={student.id}>
                              <td className="student-code-cell">{student.id}</td>
                              <td>
                                <div className="student-profile-cell">
                                  <div className={`student-avatar-initial ${student.bgClass}`}>
                                    {student.initial}
                                  </div>
                                  <span className="student-fullname">{student.name}</span>
                                </div>
                              </td>
                              <td className="student-dob-cell">{student.dob}</td>
                              <td>
                                <span className={`student-gpa-badge ${student.gpa >= 8.0 ? 'gpa-high' : student.gpa >= 6.5 ? 'gpa-medium' : 'gpa-low'}`}>
                                  {student.gpa}
                                </span>
                              </td>
                              <td>
                                <span className={`status-pill ${student.status === 'Online' ? 'online' : 'offline'}`}>
                                  {student.status}
                                </span>
                              </td>
                              <td className="text-right-aligned actions-cell-container">
                                <button 
                                  className="action-menu-btn"
                                  onClick={() => setActiveMenuStudentId(activeMenuStudentId === student.id ? null : student.id)}
                                  id={`student-menu-${student.id}`}
                                >
                                  <MoreVertical size={16} />
                                </button>
                                {activeMenuStudentId === student.id && (
                                  <div className="student-action-dropdown">
                                    <button 
                                      className="dropdown-delete-btn"
                                      onClick={() => handleDeleteStudent(student.id)}
                                    >
                                      Xoá học sinh
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer / Pagination */}
                  <div className="table-footer-pagination" id="students-table-footer">
                    <p className="footer-stats-text">
                      Hiển thị {filteredStudents.length} trên tổng số {activeClass.stats.totalStudents} học sinh
                    </p>
                    <div className="pagination-controls">
                      <button className="btn-pagination-nav" disabled>
                        <ChevronLeft size={16} />
                      </button>
                      <button className="btn-pagination-page active">1</button>
                      <button className="btn-pagination-page">2</button>
                      <button className="btn-pagination-page">3</button>
                      <button className="btn-pagination-nav">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-class-selected-state">
                <School size={48} className="empty-state-icon" />
                <h3>Chưa chọn lớp học</h3>
                <p>Hãy chọn một lớp học từ danh sách bên trái hoặc tạo lớp mới để quản lý.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Tạo lớp học mới */}
      {showAddClass && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">Tạo lớp học mới</h3>
              <button className="modal-close-btn" onClick={() => setShowAddClass(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddClass}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Tên lớp học <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ví dụ: Lớp 12A3 - Chuyên Hóa" 
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Giáo viên/Giảng viên <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ví dụ: Nguyễn Văn A" 
                    value={newClassTeacher}
                    onChange={(e) => setNewClassTeacher(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Năm học</label>
                  <select 
                    className="form-input"
                    value={newClassYear}
                    onChange={(e) => setNewClassYear(e.target.value)}
                  >
                    <option value="2023 - 2024">2023 - 2024</option>
                    <option value="2024 - 2025">2024 - 2025</option>
                    <option value="2025 - 2026">2025 - 2026</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowAddClass(false)}>Hủy</button>
                <button type="submit" className="btn-modal-submit">Tạo lớp học</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Sửa lớp học */}
      {showEditClass && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">Sửa thông tin lớp học</h3>
              <button className="modal-close-btn" onClick={() => setShowEditClass(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditClassSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Tên lớp học <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={editClassName}
                    onChange={(e) => setEditClassName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Giáo viên chủ nhiệm <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={editClassTeacher}
                    onChange={(e) => setEditClassTeacher(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Năm học</label>
                  <select 
                    className="form-input"
                    value={editClassYear}
                    onChange={(e) => setEditClassYear(e.target.value)}
                  >
                    <option value="2023 - 2024">2023 - 2024</option>
                    <option value="2024 - 2025">2024 - 2025</option>
                    <option value="2025 - 2026">2025 - 2026</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Trạng thái</label>
                  <select 
                    className="form-input"
                    value={editClassStatus}
                    onChange={(e) => setEditClassStatus(e.target.value)}
                  >
                    <option value="Đang hoạt động">Đang hoạt động</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowEditClass(false)}>Hủy</button>
                <button type="submit" className="btn-modal-submit">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Thêm học sinh */}
      {showAddStudent && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">Thêm học sinh mới</h3>
              <button className="modal-close-btn" onClick={() => setShowAddStudent(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddStudent}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Mã số học sinh <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ví dụ: HS005" 
                    value={newStudentCode}
                    onChange={(e) => setNewStudentCode(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Họ và tên <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ví dụ: Nguyễn Văn Bình" 
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Ngày sinh <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ví dụ: 20/10/2006" 
                    value={newStudentDob}
                    onChange={(e) => setNewStudentDob(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Điểm trung bình <span className="required">*</span></label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    max="10" 
                    className="form-input" 
                    placeholder="Ví dụ: 8.5" 
                    value={newStudentGpa}
                    onChange={(e) => setNewStudentGpa(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Trạng thái ban đầu</label>
                  <select 
                    className="form-input"
                    value={newStudentStatus}
                    onChange={(e) => setNewStudentStatus(e.target.value)}
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowAddStudent(false)}>Hủy</button>
                <button type="submit" className="btn-modal-submit">Thêm vào lớp</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}