import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore"; // Assuming user state is stored here
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import "./Sidebar.css"; // Custom styles for sidebar

const Sidebar: React.FC = () => {
  const { userLogin, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="usa-sidenav sidebar">
      {/* User Info Section */}
      <div className="sidebar-header">
        <p className="usa-text-bold">Welcome, {userLogin || "Please login"}</p>
      </div>

      {/* Navigation Links */}
      <ul className="usa-sidenav-list">
        <li>
          <NavLink to="/upload" className={({ isActive }) => (isActive ? "usa-current" : "")}>
            File Upload
          </NavLink>
        </li>
        <li>
          <NavLink to="/status" className={({ isActive }) => (isActive ? "usa-current" : "")}>
            Dashboard
          </NavLink>
        </li>
        <li>
        <button
              className="usa-button usa-button--secondary logout-button"
              onClick={handleLogout}
            >
              {isLoginPage ? "Login" : "Logout"}
            </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
