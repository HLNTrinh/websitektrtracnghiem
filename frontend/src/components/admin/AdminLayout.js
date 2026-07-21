import React, { useState, useEffect } from 'react';
import { FaBars, FaGraduationCap, FaCheckCircle } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import '../../styles/AdminSettingManagement.css';

export default function AdminLayout({ children, pageTitle, pageSubtitle }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Auto-hide toast notification after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <div className="asm-wrapper">
      {/* Mobile Header bar */}
      <div className="asm-mobile-header">
        <button className="asm-hamburger" onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="asm-logo-icon-box" style={{ width: '32px', height: '32px', fontSize: '18px' }}>
            <FaGraduationCap />
          </div>
          <span style={{ fontWeight: '700', fontSize: '16px', color: '#111c2d' }}>EduQuiz</span>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
          alt="Avatar" 
          className="asm-avatar" 
          style={{ width: '30px', height: '30px' }}
        />
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div className="asm-sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      <AdminSidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
        showToastMessage={showToastMessage}
      />

      {/* Main Container */}
      <div className="asm-main">
        <AdminHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showToastMessage={showToastMessage}
        />

        {/* Nội dung trang */}
        <main className="asm-content">
          {pageTitle && (
            <header className="asm-page-header">
              <h1 className="asm-page-title">{pageTitle}</h1>
              {pageSubtitle && <p className="asm-page-subtitle">{pageSubtitle}</p>}
            </header>
          )}
          {children}
        </main>
      </div>

      {/* Dynamic Success Toast Message */}
      {showToast && (
        <div className="asm-toast">
          <FaCheckCircle className="asm-toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}