import { useState } from 'react'
import './Profile.css'

export default function Profile() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="profile-main">
      <header className="profile-topbar">
        <h1>Hồ sơ cá nhân</h1>
        <div className="dash-header-actions">
          <button className="icon-btn"><BellIcon /></button>
          <button className="icon-btn"><HelpIcon /></button>
          <div className="user-chip">
            <img src="https://i.pravatar.cc/64?img=33" alt="" />
            <div className="user-chip-text">
              <span className="name">Nguyễn Văn A</span>
              <span className="role">Quản trị viên</span>
            </div>
          </div>
        </div>
      </header>

      <section className="profile-grid">
        <div className="card profile-info-card">
          <div className="profile-info-top">
            <div className="avatar-wrap">
              <img src="https://i.pravatar.cc/200?img=33" alt="" />
              <button className="avatar-edit"><CameraIcon /></button>
            </div>
            <div className="profile-name-block">
              <h2>Nguyễn Văn A</h2>
              <div className="badges">
                <span className="role-badge">QUẢN TRỊ VIÊN</span>
                <span className="status-dot" /> Hoạt động
              </div>
            </div>
            <button className="btn-primary"><EditIcon /> Cập nhật thông tin</button>
          </div>

          <div className="info-fields">
            <div className="info-field">
              <span className="if-label"><MailIcon /> EMAIL CÁ NHÂN</span>
              <span className="if-value">nguyenvana@eduquiz.vn</span>
            </div>
            <div className="info-field">
              <span className="if-label"><PhoneIcon /> SỐ ĐIỆN THOẠI</span>
              <span className="if-value">090 123 4567</span>
            </div>
            <div className="info-field">
              <span className="if-label"><BriefcaseIcon /> VAI TRÒ</span>
              <span className="if-value">Quản lý hệ thống (Super Admin)</span>
            </div>
            <div className="info-field">
              <span className="if-label"><CalendarIcon /> NGÀY THAM GIA</span>
              <span className="if-value">15/05/2023</span>
            </div>
          </div>
        </div>

        <div className="card settings-card">
          <h3><SlidersIcon /> Cài đặt hệ thống</h3>

          <label className="field-label">Ngôn ngữ hiển thị</label>
          <select className="select-field" defaultValue="vi">
            <option value="vi">Tiếng Việt (Việt Nam)</option>
            <option value="en">English (US)</option>
          </select>

          <div className="field-label" style={{ marginTop: 22 }}>Thông báo ứng dụng</div>
          <div className="toggle-row">
            <span><MailIcon /> Thông báo qua Email</span>
            <Toggle checked={emailNotif} onChange={() => setEmailNotif((v) => !v)} />
          </div>
          <div className="toggle-row">
            <span><BellOutlineIcon /> Thông báo đẩy (Push)</span>
            <Toggle checked={pushNotif} onChange={() => setPushNotif((v) => !v)} />
          </div>

          <button className="btn-primary full" style={{ marginTop: 24 }}>Lưu cấu hình</button>
        </div>
      </section>

      <section className="card security-card">
        <div className="security-left">
          <h3><ShieldIcon /> Bảo mật tài khoản</h3>
          <p>Đảm bảo tài khoản của bạn luôn an toàn bằng cách sử dụng mật khẩu mạnh và thay đổi định kỳ mỗi 3 tháng.</p>
          <div className="tip-box">
            ℹ️ Mật khẩu nên chứa ít nhất 8 ký tự, bao gồm cả chữ hoa, chữ thường và chữ số.
          </div>
        </div>
        <div className="security-right">
          <label className="field-label">Mật khẩu hiện tại</label>
          <PasswordInput visible={showCurrent} onToggle={() => setShowCurrent((v) => !v)} />

          <div className="pw-row">
            <div>
              <label className="field-label">Mật khẩu mới</label>
              <PasswordInput visible={showNew} onToggle={() => setShowNew((v) => !v)} />
            </div>
            <div>
              <label className="field-label">Xác nhận mật khẩu mới</label>
              <PasswordInput visible={showConfirm} onToggle={() => setShowConfirm((v) => !v)} />
            </div>
          </div>

          <button className="btn-dark">Đổi mật khẩu</button>
        </div>
      </section>

      <footer className="profile-footer">© 2024 EduQuiz. Hỗ trợ kỹ thuật: support@eduquiz.vn</footer>
    </div>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <button className={'toggle' + (checked ? ' on' : '')} onClick={onChange}>
      <span className="toggle-knob" />
    </button>
  )
}

function PasswordInput({ visible, onToggle }) {
  return (
    <div className="pw-input">
      <input type={visible ? 'text' : 'password'} defaultValue="password123" />
      <button onClick={onToggle} type="button"><EyeIcon /></button>
    </div>
  )
}

function BellIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
}
function BellOutlineIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
}
function HelpIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .8-1 1.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="17" r="0.9" fill="currentColor" /></svg>
}
function CameraIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 8h3l2-2h6l2 2h3v11H4V8Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="12" cy="13.5" r="3.2" stroke="white" strokeWidth="1.6" /></svg>
}
function EditIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m14.5 4.5 5 5-11 11H3.5v-5l11-11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
}
function MailIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="m4 6.5 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
}
function PhoneIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5V19a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
}
function BriefcaseIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="7.5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12.5h18" stroke="currentColor" strokeWidth="1.6" /></svg>
}
function CalendarIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
}
function SlidersIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="9" cy="6" r="2" fill="var(--color-surface)" stroke="currentColor" strokeWidth="1.6" /><circle cx="16" cy="12" r="2" fill="var(--color-surface)" stroke="currentColor" strokeWidth="1.6" /><circle cx="10" cy="18" r="2" fill="var(--color-surface)" stroke="currentColor" strokeWidth="1.6" /></svg>
}
function ShieldIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3 4.5 6v6c0 5 3.4 8 7.5 9 4.1-1 7.5-4 7.5-9V6L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
}
function EyeIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" /></svg>
}