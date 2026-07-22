import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaBell, 
  FaQuestionCircle 
} from 'react-icons/fa';

export default function AdminHeader({ searchQuery, setSearchQuery, showToastMessage }) {
  const navigate = useNavigate();

  return (
    <header className="asm-header">
      <div className="asm-search-container">
        <FaSearch className="asm-search-icon" />
        <input 
          type="text" 
          className="asm-search-input" 
          placeholder="Tìm kiếm..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="asm-header-right">
        <button className="asm-icon-btn" onClick={() => navigate('/admin/notifications')}>
          <FaBell />
          <span className="asm-badge" />
        </button>
        <button className="asm-icon-btn" onClick={() => showToastMessage('Mở trang trợ giúp & Hướng dẫn.')}>
          <FaQuestionCircle />
        </button>
        <div className="asm-v-divider" />
        
        <div className="asm-user-profile">
          <div className="asm-user-info">
            <p className="asm-user-name">Quản trị viên</p>
            <p className="asm-user-role">Admin Level 1</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="Ảnh đại diện" 
            className="asm-avatar"
          />
        </div>
      </div>
    </header>
  );
}
