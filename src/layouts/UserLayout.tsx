import React from "react";
import UserSidebar from "../components/user/UserSidebar";
import Header from "../components/Header";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="main-container">
        <UserSidebar />
        <div className="user-content">{children}</div>
      </div>
    </div>
  );
};



export default UserLayout;
