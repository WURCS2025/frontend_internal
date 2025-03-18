import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import UserLogin from "./components/user/UserLogin";
import UserSideBar from "./components/user/UserSidebar";
import UserUploadStatus from "./components/user/UserUploadStatus";
import ProtectedRoute from "./components/user/ProtectedRoute";
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import { UserProfile } from "./components/user/UserProfile";
import AdminLogin from "./components/admin/AdminLogin";
import "./App.css";

const App: React.FC = () => {

  
  return (
    <Router>
      <div className="app-layout">
        <div className="sidebar">
          <UserSideBar />
        </div>

        <main className="main-content">
          <div className="header">
            <Header />
          </div>

          <div className="content-body">
            <Routes>
              <Route path="/login" element={<UserLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/upload" element={<UploadForm />} />
                <Route path="/status" element={<UserUploadStatus />} />
                <Route path="/profile" element={<UserProfile />} />
              </Route>
              <Route path="*" element={<UserLogin />} />
              <Route path="/admin" element={<AdminLogin />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
