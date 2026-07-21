import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const { user } = useAuth();

    return (
        <aside className="sidebar">

            <h2 className="logo">EduQuiz</h2>

            {/* Thông tin người dùng */}
            <div className="sidebar-user">
                <img
                    src={user?.avatar || "https://i.pravatar.cc/80?img=12"}
                    alt="avatar"
                    className="sidebar-avatar"
                />

                <h3>{user?.name || "Học sinh"}</h3>

                <p>{user?.email}</p>
            </div>

            <nav className="sidebar-nav">

                <NavLink
                    to="/student/dashboard"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    Tổng quan
                </NavLink>

                <NavLink
                    to="/student/exams"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    Bài thi
                </NavLink>

                <NavLink
                    to="/student/results"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    Lịch sử
                </NavLink>

                <NavLink
                    to="/student/profile"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    Hồ sơ
                </NavLink>

            </nav>

        </aside>
    );
}