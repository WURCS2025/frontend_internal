import React from "react";
import AdminSidebar from "../components/admin/AdminSideBar";
import Header from "../components/Header";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="main-container">
        <AdminSidebar />
        <div className="user-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
