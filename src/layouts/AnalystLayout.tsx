import React from "react";
import AnalystSideBar from "../components/analyst/AnalystSideBar";
import Header from "../components/Header";

const AnalystLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="shared-width">
        <Header />
      </div>
      <div className="main-container shared-width">
        <AnalystSideBar />
        <div className="user-content">{children}</div>
      </div>
    </div>
  );
};


export default AnalystLayout;
