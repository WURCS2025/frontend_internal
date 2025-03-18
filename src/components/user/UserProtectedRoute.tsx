import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const UserProtectedRoute: React.FC = () => {
  const { userLogin } = useAuthStore();

  // Check if the user is logged in
  if (!userLogin || !localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
