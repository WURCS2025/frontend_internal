import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import Header from "../components/Header";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-container">
      <Header /> {/* ✅ Ensure Header is part of the layout */}
      <div className="main-container">
      <AdminSidebar />
      <div className="user-content">{children}</div>
      </div>
      </div>
  );
};


export default AdminLayout;
