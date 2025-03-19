
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../components/admin/AdminLogin";
import AdminUserManagement from "../components/admin/AdminUserManagement";
import AdminUploadStatus from "../components/admin/AdminUploadStatus";
import UserUpload from "../components/user/UserUpload";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/upload" element={<UserUpload />} />
        <Route path="/admin/dashboard" element={<AdminUploadStatus />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
