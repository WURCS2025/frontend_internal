
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
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/upload" element={<UserUpload />} />
        <Route path="/status" element={<AdminUploadStatus />} />
        <Route path="/users" element={<AdminUserManagement />} />  
        <Route path="*" element={<AdminLogin />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
