// AdminLogin.tsx
import React, { useState } from "react";
import { LoginPage, OktaComponent, LogoutPage } from "../OktaLogin";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const AnalystLogin: React.FC = () => {
 

  return (
    <div className="grid-container usa-prose">   
          
      
      <h2>Analyst Login</h2>
      <p>Wecome to WURCS web portal, please login to access protected features</p>
      {/* <OktaComponent /> */}
      
    </div>
  );
};

export default AnalystLogin;