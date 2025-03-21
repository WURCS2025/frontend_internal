import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import "../../../css/Sidebar.css"; // Custom styles for sidebar

const AdminSideBar: React.FC = () => {
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

      {/* Navigation Links without <ul> or <li> */}
      <div className="usa-sidenav-list">
        <NavLink to="/admin/upload" className={({ isActive }) => (isActive ? "usa-current" : "")}>
          File Upload
        </NavLink>

        <NavLink to="/admin/status" className={({ isActive }) => (isActive ? "usa-current" : "")}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "usa-current" : "")}>
          Profile
        </NavLink>

        <NavLink to="/admin/profile" className={({ isActive }) => (isActive ? "usa-current" : "")}>
          Profile
        </NavLink>

        <button
          className="usa-button usa-button--secondary logout-button"
          onClick={handleLogout}
        >
          {isLoginPage ? "Login" : "Logout"}
        </button>
      </div>
    </nav>
  );
};

export default AdminSideBar;
