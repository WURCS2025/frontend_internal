import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import UploadStatus from "./components/FileUploadStatus";

import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import "./App.css";
import { API_URL, API_URL_ROOT } from "./constants";

const App: React.FC = () => {

  
  return (
    <Router>
      <div className="app-layout">
        <div className="sidebar">
          <Sidebar />
        </div>

        <main className="main-content">
          <div className="header">
            <Header />
          </div>

          <div className="content-body">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/upload" element={<UploadForm />} />
              <Route path="/status" element={<UploadStatus />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
