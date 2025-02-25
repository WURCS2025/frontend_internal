import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
        <Header />
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="*" element={<Login />} /> {/* Redirect unknown routes to login */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
