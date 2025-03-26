import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import './App.css'; // Import your global CSS file

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* User Routes */}
        <Route path="/user/*" element={<UserRoutes />} />

        {/* Default: Redirect to User Login */}
        <Route path="*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
