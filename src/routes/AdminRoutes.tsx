import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminUserManagement from "../components/admin/AdminUserManagement";
import AdminUpload from "../components/admin/AdminUpload";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/admin/upload" element={<AdminUpload />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
