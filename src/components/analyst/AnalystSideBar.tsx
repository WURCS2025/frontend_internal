import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import "../../../css/Sidebar.css"; // Custom styles for sidebar
import SidebarHeader from "../common/SidebarHeader";

const AnalystSideBar: React.FC = () => {
  const { userLogin, userrole, logout } = useAuthStore();
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
      <SidebarHeader userLogin={userLogin} userRole={userrole} />

      {/* Navigation Links without <ul> or <li> */}
      <div className="usa-sidenav-list">
        <NavLink to="/analyst/upload" className={({ isActive }) => (isActive ? "usa-current" : "")}>
          File Upload
        </NavLink>

        <NavLink to="/analyst/status" className={({ isActive }) => (isActive ? "usa-current" : "")}>
          Dashboard
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

export default AnalystSideBar;
