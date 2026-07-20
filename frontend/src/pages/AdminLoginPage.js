import React, { useState } from "react";
// Thêm để test giao diện trước 
import { useNavigate } from "react-router-dom";

import { MdAdminPanelSettings } from "react-icons/md";
import "../styles/AdminLogin.css";

function AdminLoginPage() {
  //thêm test giao diện trước 
  const navigate = useNavigate();
// ------------
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Sau này gọi API
    //alert("Đăng nhập Admin");
    // Chỉ để test giao diện
    navigate("/admin/dashboard");
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-logo">
          <MdAdminPanelSettings />
        </div>

        <h1>Admin Portal</h1>

        <p>
          Hệ thống quản trị Website Thi Trắc Nghiệm
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Tên đăng nhập</label>

            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>

            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn">
            Đăng nhập
          </button>

        </form>

        <button className="back-btn">
          Quay lại trang đăng nhập
        </button>

      </div>

    </div>
  );
}

export default AdminLoginPage;