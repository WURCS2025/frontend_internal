import React from "react";
import UserSidebar from "../components/user/UserSidebar";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="user-container">
      <UserSidebar />
      <div className="user-content">{children}</div>
    </div>
  );
};

export default UserLayout;
