import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import UploadStatus from "./components/FileUploadStatus";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionWarning from "./components/SessionWarning";
import { useAuthStore } from "./stores/authStore";

import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import "./App.css";

const App: React.FC = () => {
  const { userLogin, setUserLogin } = useAuthStore();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // Session Timers
  const SESSION_WARNING_TIME = 4 * 60 * 1000; // 4 minutes
  const SESSION_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

  let warningTimer: NodeJS.Timeout;
  let logoutTimer: NodeJS.Timeout;

  // Reset session timers
  const resetSession = useCallback(() => {
    clearTimeout(warningTimer);
    clearTimeout(logoutTimer);

    warningTimer = setTimeout(() => {
      setShowWarning(true);
    }, SESSION_WARNING_TIME);

    logoutTimer = setTimeout(() => {
      handleLogout();
    }, SESSION_EXPIRY_TIME);
  }, []);

  useEffect(() => {
    if (userLogin) {
      resetSession();

      window.addEventListener("mousemove", resetSession);
      window.addEventListener("keypress", resetSession);

      return () => {
        clearTimeout(warningTimer);
        clearTimeout(logoutTimer);
        window.removeEventListener("mousemove", resetSession);
        window.removeEventListener("keypress", resetSession);
      };
    }
  }, [userLogin, resetSession]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserLogin(null);
    setIsSessionExpired(true);
    navigate("/login");
  };

  // Continue session
  const handleContinueSession = () => {
    setShowWarning(false);
    resetSession();
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/status" element={<UploadStatus />} />
          </Route>

          <Route path="*" element={<Login />} />
        </Routes>

        {/* Warning Modal */}
        {showWarning && (
          <SessionWarning onContinue={handleContinueSession} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
};

export default App;
