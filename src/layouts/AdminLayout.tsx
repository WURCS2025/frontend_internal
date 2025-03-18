import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
};

export default AdminLayout;
