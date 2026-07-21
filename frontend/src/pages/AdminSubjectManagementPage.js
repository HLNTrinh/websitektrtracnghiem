import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { 
  MdMenuBook, 
  MdSearch, 
  MdHelpOutline, 
  MdAddCircle, 
  MdLibraryBooks, 
  MdCheckCircle, 
  MdPending, 
  MdFilterList, 
  MdVisibility, 
  MdEdit, 
  MdDelete, 
  MdChevronLeft, 
  MdChevronRight, 
  MdClose,
  MdSchool
} from 'react-icons/md';
import '../styles/AdminSubjectManagement.css';

const defaultSubjects = [
  { id: 1, code: 'MATH101', name: 'Toán giải tích', department: 'Khoa học tự nhiên', examsCount: 12, status: 'Đang hoạt động', updatedAt: '2 giờ trước' },
  { id: 2, code: 'PHYS102', name: 'Vật lý đại cương', department: 'Khoa học tự nhiên', examsCount: 8, status: 'Đang hoạt động', updatedAt: 'Hôm qua' },
  { id: 3, code: 'CHEM201', name: 'Hóa học hữu cơ', department: 'Khoa học tự nhiên', examsCount: 15, status: 'Tạm dừng', updatedAt: '3 ngày trước' },
  { id: 4, code: 'ENGL001', name: 'Tiếng Anh giao tiếp', department: 'Ngôn ngữ', examsCount: 24, status: 'Đang hoạt động', updatedAt: 'Tuần trước' },
  { id: 5, code: 'COMP102', name: 'Lập trình hướng đối tượng', department: 'Kỹ thuật & Công nghệ', examsCount: 18, status: 'Đang hoạt động', updatedAt: '3 ngày trước' },
  { id: 6, code: 'ECON101', name: 'Kinh tế vĩ mô', department: 'Kinh tế & Quản lý', examsCount: 10, status: 'Tạm dừng', updatedAt: '5 ngày trước' },
  { id: 7, code: 'HIST101', name: 'Lịch sử văn minh thế giới', department: 'Khoa học xã hội', examsCount: 6, status: 'Đang hoạt động', updatedAt: '1 tuần trước' },
  { id: 8, code: 'MKT201', name: 'Nguyên lý Marketing', department: 'Kinh tế & Quản lý', examsCount: 14, status: 'Đang hoạt động', updatedAt: 'Hôm nay' }
];

export default function AdminSubjectManagementPage() {
  // State managers
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('Tất cả khoa/ngành');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Modal Control States
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  
  // Form State
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentSubject, setCurrentSubject] = useState(null);
  const [formValues, setFormValues] = useState({
    code: '',
    name: '',
    department: 'Khoa học tự nhiên',
    examsCount: 0,
    status: 'Đang hoạt động'
  });

  // Notification Toast States
  const [toast, setToast] = useState(null);

  // Auto-hide Toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Show customized toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Extract unique departments for dropdown
  const departments = ['Tất cả khoa/ngành', ...new Set(subjects.map(s => s.department))];

  // Filtering subjects list
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = 
      subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = 
      selectedDept === 'Tất cả khoa/ngành' || 
      subject.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  // Calculate paginated elements
  const totalItems = filteredSubjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredSubjects.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDept]);

  // Handle Input Changes in Add/Edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: name === 'examsCount' ? parseInt(value) || 0 : value
    }));
  };

  // Open Modal Helpers
  const openAddModal = () => {
    setModalType('add');
    setFormValues({
      code: '',
      name: '',
      department: 'Khoa học tự nhiên',
      examsCount: 0,
      status: 'Đang hoạt động'
    });
    setShowAddEditModal(true);
  };

  const openEditModal = (subject) => {
    setModalType('edit');
    setCurrentSubject(subject);
    setFormValues({
      code: subject.code,
      name: subject.name,
      department: subject.department,
      examsCount: subject.examsCount,
      status: subject.status
    });
    setShowAddEditModal(true);
  };

  const openDeleteModal = (subject) => {
    setCurrentSubject(subject);
    setShowDeleteModal(true);
  };

  const openViewModal = (subject) => {
    setCurrentSubject(subject);
    setShowViewModal(true);
  };

  // Submit operations
  const handleSaveSubject = (e) => {
    e.preventDefault();
    if (!formValues.code.trim() || !formValues.name.trim()) {
      showToast('Vui lòng điền đầy đủ mã môn và tên môn học!', 'error');
      return;
    }

    if (modalType === 'add') {
      // Check duplicate code
      if (subjects.some(s => s.code.toUpperCase() === formValues.code.toUpperCase())) {
        showToast('Mã môn học này đã tồn tại trên hệ thống!', 'error');
        return;
      }

      const newSubject = {
        id: subjects.length ? Math.max(...subjects.map(s => s.id)) + 1 : 1,
        code: formValues.code.toUpperCase(),
        name: formValues.name,
        department: formValues.department,
        examsCount: formValues.examsCount,
        status: formValues.status,
        updatedAt: 'Vừa xong'
      };

      setSubjects([newSubject, ...subjects]);
      showToast(`Đã thêm môn học "${newSubject.name}" thành công!`, 'success');
    } else {
      // Edit operation
      setSubjects(prev => prev.map(s => s.id === currentSubject.id ? {
        ...s,
        code: formValues.code.toUpperCase(),
        name: formValues.name,
        department: formValues.department,
        examsCount: formValues.examsCount,
        status: formValues.status,
        updatedAt: 'Vừa cập nhật'
      } : s));
      showToast(`Cập nhật môn học "${formValues.name}" thành công!`, 'success');
    }

    setShowAddEditModal(false);
  };

  const handleDeleteSubject = () => {
    setSubjects(prev => prev.filter(s => s.id !== currentSubject.id));
    showToast(`Đã xóa môn học "${currentSubject.name}" khỏi hệ thống!`, 'info');
    setShowDeleteModal(false);
  };

  // Stat summary calculations
  const totalCount = subjects.length;
  const activeCount = subjects.filter(s => s.status === 'Đang hoạt động').length;
  const pausedCount = subjects.filter(s => s.status === 'Tạm dừng').length;
  const deptCount = [...new Set(subjects.map(s => s.department))].length;

  return (
    <AdminLayout pageTitle="Quản lý môn học" pageSubtitle="Danh sách và quản lý các môn học hiện có trong hệ thống.">
      {/* Toast alert notifications */}
      {toast && (
        <div className="toast-container" id="toastContainer">
          <div className={`toast ${toast.type}`}>
            <span className="toast-icon">
              {toast.type === 'success' && <MdCheckCircle />}
              {toast.type === 'error' && <MdClose />}
              {toast.type === 'info' && <MdPending />}
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Page Content Dashboard */}
      <div className="page-view">
        {/* Bento Stats Summary Layout */}
        <div className="bento-stats" id="bentoStats">
          <div className="stat-card">
            <div className="stat-icon-wrapper blue">
              <MdLibraryBooks />
            </div>
            <div className="stat-info">
              <p>Tổng môn học</p>
              <h3>{totalCount < 10 ? `0${totalCount}` : totalCount}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper green">
              <MdCheckCircle />
            </div>
            <div className="stat-info">
              <p>Đang hoạt động</p>
              <h3>{activeCount < 10 ? `0${activeCount}` : activeCount}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper orange">
              <MdPending />
            </div>
            <div className="stat-info">
              <p>Tạm dừng</p>
              <h3>{pausedCount < 10 ? `0${pausedCount}` : pausedCount}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper purple">
              <MdSchool />
            </div>
            <div className="stat-info">
              <p>Số khoa/ngành</p>
              <h3>{deptCount < 10 ? `0${deptCount}` : deptCount}</h3>
            </div>
          </div>
        </div>

        {/* Search Filters Card Wrapper */}
        <div className="filters-container" id="filtersContainer">
          <div className="filter-search-box">
            <MdSearch className="filter-search-icon" />
            <input 
              type="text" 
              placeholder="Tìm mã hoặc tên môn học..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-right">
            <select 
              className="custom-select" 
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept}</option>
              ))}
            </select>

            <button className="btn-secondary" onClick={() => showToast('Đã áp dụng các bộ lọc tìm kiếm!', 'info')}>
              <MdFilterList className="btn-secondary-icon" />
              <span>Lọc</span>
            </button>
            
            <button className="btn-primary" onClick={openAddModal} id="btnAddSubject">
              <MdAddCircle className="btn-primary-icon" />
              <span>Thêm môn học mới</span>
            </button>
          </div>
        </div>

        {/* Table Card Section */}
        <div className="table-card" id="tableCard">
          <div className="table-responsive">
            <table className="subjects-table">
              <thead>
                <tr>
                  <th>Mã môn học</th>
                  <th>Tên môn học</th>
                  <th>Khoa/Ngành</th>
                  <th>Số lượng đề thi</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: 'right' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((subject) => (
                    <tr key={subject.id}>
                      <td>
                        <span className="subject-code-badge">{subject.code}</span>
                      </td>
                      <td>
                        <div className="subject-name-cell">
                          <span className="subject-name">{subject.name}</span>
                          <span className="subject-update-time">Cập nhật: {subject.updatedAt}</span>
                        </div>
                      </td>
                      <td>
                        <span className="dept-text">{subject.department}</span>
                      </td>
                      <td>
                        <div className="exams-count-badge">
                          <span className="exams-count-num">
                            {subject.examsCount < 10 ? `0${subject.examsCount}` : subject.examsCount}
                          </span>
                          <span className="exams-set-label">Bộ đề</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${subject.status === 'Đang hoạt động' ? 'active' : 'paused'}`}>
                          <span className="status-dot"></span>
                          {subject.status}
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell-wrapper">
                          <button 
                            className="action-icon-btn view" 
                            title="Xem chi tiết" 
                            onClick={() => openViewModal(subject)}
                          >
                            <MdVisibility />
                          </button>
                          <button 
                            className="action-icon-btn edit" 
                            title="Chỉnh sửa" 
                            onClick={() => openEditModal(subject)}
                          >
                            <MdEdit />
                          </button>
                          <button 
                            className="action-icon-btn delete" 
                            title="Xóa" 
                            onClick={() => openDeleteModal(subject)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                      Không tìm thấy môn học nào phù hợp với bộ lọc tìm kiếm!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls Footer */}
          {totalItems > 0 && (
            <div className="pagination-section">
              <p className="pagination-text">
                Hiển thị <span className="pagination-highlight">{startIndex + 1} - {endIndex}</span> trên tổng số <span className="pagination-highlight">{totalItems}</span> môn học
              </p>
              <div className="pagination-controls">
                <button 
                  className="pagination-nav-btn" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  title="Trang trước"
                >
                  <MdChevronLeft />
                </button>

                <div className="pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button 
                      key={page} 
                      className={`page-number-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button 
                  className="pagination-nav-btn" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  title="Trang sau"
                >
                  <MdChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Bottom Box / Illustration */}
        <div className="decorative-empty-state">
          <div className="empty-icon-circle">
            <MdSchool />
          </div>
          <h3>Tối ưu hóa quản lý đào tạo</h3>
          <p>
            Hệ thống giúp bạn dễ dàng tổ chức nội dung học tập và thi cử theo các chuyên mục khoa học, tăng cường hiệu suất quản lý cho bộ phận học vụ.
          </p>
        </div>
      </div>

      {/* Modal: ADD / EDIT SUBJECT */}
      {showAddEditModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>{modalType === 'add' ? 'Thêm môn học mới' : 'Chỉnh sửa thông tin môn học'}</h3>
              <button className="modal-close-btn" onClick={() => setShowAddEditModal(false)}>
                <MdClose />
              </button>
            </div>
            <form onSubmit={handleSaveSubject}>
              <div className="modal-body">
                <div className="modal-form">
                  <div className="form-group">
                    <label htmlFor="code">Mã môn học</label>
                    <input 
                      type="text" 
                      id="code" 
                      name="code" 
                      placeholder="VD: MATH101, PHYS102" 
                      value={formValues.code}
                      onChange={handleInputChange}
                      required
                      disabled={modalType === 'edit'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Tên môn học</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Nhập tên môn học..." 
                      value={formValues.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="department">Khoa / Ngành đào tạo</label>
                    <select 
                      id="department" 
                      name="department" 
                      value={formValues.department}
                      onChange={handleInputChange}
                    >
                      <option value="Khoa học tự nhiên">Khoa học tự nhiên</option>
                      <option value="Ngôn ngữ">Ngôn ngữ</option>
                      <option value="Kỹ thuật & Công nghệ">Kỹ thuật & Công nghệ</option>
                      <option value="Kinh tế & Quản lý">Kinh tế & Quản lý</option>
                      <option value="Khoa học xã hội">Khoa học xã hội</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="examsCount">Số lượng bộ đề</label>
                      <input 
                        type="number" 
                        id="examsCount" 
                        name="examsCount" 
                        min="0"
                        value={formValues.examsCount}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="status">Trạng thái hoạt động</label>
                      <select 
                        id="status" 
                        name="status" 
                        value={formValues.status}
                        onChange={handleInputChange}
                      >
                        <option value="Đang hoạt động">Đang hoạt động</option>
                        <option value="Tạm dừng">Tạm dừng</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowAddEditModal(false)}>Hủy bỏ</button>
                <button type="submit" className="btn-submit">Lưu thông tin</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: VIEW SUBJECT DETAILS */}
      {showViewModal && currentSubject && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Chi tiết môn học</h3>
              <button className="modal-close-btn" onClick={() => setShowViewModal(false)}>
                <MdClose />
              </button>
            </div>
            <div className="modal-body">
              <div className="view-details-grid">
                <div className="view-detail-item">
                  <span className="view-detail-label">Mã môn học</span>
                  <span className="view-detail-value code">{currentSubject.code}</span>
                </div>

                <div className="view-detail-item">
                  <span className="view-detail-label">Tên môn học</span>
                  <span className="view-detail-value">{currentSubject.name}</span>
                </div>

                <div className="view-detail-item">
                  <span className="view-detail-label">Khoa / Ngành</span>
                  <span className="view-detail-value">{currentSubject.department}</span>
                </div>

                <div className="view-detail-item">
                  <span className="view-detail-label">Số lượng đề thi</span>
                  <span className="view-detail-value">{currentSubject.examsCount} bộ đề</span>
                </div>

                <div className="view-detail-item">
                  <span className="view-detail-label">Trạng thái</span>
                  <span className="view-detail-value">
                    <span className={`status-badge ${currentSubject.status === 'Đang hoạt động' ? 'active' : 'paused'}`}>
                      <span className="status-dot"></span>
                      {currentSubject.status}
                    </span>
                  </span>
                </div>

                <div className="view-detail-item">
                  <span className="view-detail-label">Cập nhật lần cuối</span>
                  <span className="view-detail-value">{currentSubject.updatedAt}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-submit" onClick={() => setShowViewModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: DELETE SUBJECT CONFIRMATION */}
      {showDeleteModal && currentSubject && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Xác nhận xóa môn học</h3>
              <button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}>
                <MdClose />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: '1.6' }}>
                Bạn có chắc chắn muốn xóa môn học <strong>{currentSubject.name} ({currentSubject.code})</strong> không? 
                Hành động này không thể hoàn tác và tất cả các bộ đề thuộc môn học này cũng sẽ bị gỡ bỏ khỏi hệ thống.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Hủy bỏ</button>
              <button type="button" className="btn-danger" onClick={handleDeleteSubject}>Đồng ý xóa</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}