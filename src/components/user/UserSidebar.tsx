import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import SidebarHeader from "../common/SidebarHeader"; // Assuming you have a SidebarHeader component
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import "../../../css/Sidebar.css"; // Custom styles for sidebar

const UserSideBar: React.FC = () => {
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
      <SidebarHeader userLogin={`${userLogin}`} userRole={userrole}/>

      {/* Navigation Links without <ul> or <li> */}
      <div className="usa-sidenav-list">
        <NavLink to="/upload" className={({ isActive }) => (isActive ? "usa-current" : "")}>
          File Upload
        </NavLink>

        <NavLink to="/status" className={({ isActive }) => (isActive ? "usa-current" : "")}>
          Dashboard
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => (isActive ? "usa-current" : "")}>
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

export default UserSideBar;
