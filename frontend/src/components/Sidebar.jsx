import "./Sidebar.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

    return (

        <aside className="sidebar">

            <h2>EduQuiz</h2>

            <nav className="sidebar-nav">

                <NavLink
                    to="/student/dashboard"
                    className={({isActive}) =>
                        isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                    }
                >
                    Tổng quan
                </NavLink>

                <NavLink
                    to="/student/exams"
                    className={({isActive}) =>
                        isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                    }
                >
                    Bài thi
                </NavLink>

                <NavLink
                    to="/student/results"
                    className={({isActive}) =>
                        isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                    }
                >
                    Lịch sử
                </NavLink>

                <NavLink
                    to="/student/profile"
                    className={({isActive}) =>
                        isActive
                        ? "sidebar-link active"
                        : "sidebar-link"
                    }
                >
                    Hồ sơ
                </NavLink>

            </nav>

        </aside>

    );
}