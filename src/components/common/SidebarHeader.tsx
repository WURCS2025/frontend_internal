import React from "react";
import { capitalizeFirstLetterSafe } from "../../utility/Utility";

interface SidebarHeaderProps {
  userLogin: string | null;
  userRole: string | null;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ userLogin, userRole }) => {
  return (
    <div className="sidebar-header margin-y-3">
      <p className="usa-font-bold font-sans-lg">Welcome</p>
      {(userRole && userLogin !== null) && (
  <p className="usa-font-bold font-sans-lg">
    {capitalizeFirstLetterSafe(userRole)} : {userLogin}
  </p>
)}
      
    </div>
  );
};

export default SidebarHeader;
