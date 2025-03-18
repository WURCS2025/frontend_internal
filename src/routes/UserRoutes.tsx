import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../components/user/UserDashboard";
import UserUpload from "../components/user/UserUpload";
import UserLogin from "../components/user/UserLogin";

const UserRoutes = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/upload" element={<UserUpload />} />
      </Routes>
    </UserLayout>
  );
};

export default UserRoutes;
