import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const AnalystProtectedRoute: React.FC = () => {
  const { userLogin } = useAuthStore();

  console.log("AnalystProtectedRoute: userLogin =", userLogin);
  console.log("AnalystProtectedRoute: user =", localStorage.getItem("user"));
  console.log("AnalystProtectedRoute: userrole =", localStorage.getItem("userrole"));
  // Check if the user is logged in
  if (!userLogin || !localStorage.getItem("user") || localStorage.getItem("userrole") !== 'analyst') {
    return <Navigate to="/analyst/login" replace />;
  }

  return <Outlet />;
};

export default AnalystProtectedRoute;
