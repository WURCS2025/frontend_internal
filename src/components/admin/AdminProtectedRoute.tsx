import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const AdminProtectedRoute: React.FC = () => {
  const { userLogin } = useAuthStore();

  // Check if the user is logged in
  if (!userLogin || !localStorage.getItem("user") || localStorage.getItem("userrole") !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
