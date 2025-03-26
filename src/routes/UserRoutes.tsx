
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import UserUploadStatus  from "../components/user/UserUploadStatus";
import UserUpload from "../components/user/UserUpload";
import UserLogin from "../components/user/UserLogin";
import UserProtectedRoute from "../components/user/UserProtectedRoute";
import { UserProfile } from "../components/user/UserProfile";
import HelpComponent from "../components/common/HelpComponent";

const UserRoutes = () => {
  return (
    
    <UserLayout>
      <Routes>
        
        <Route path="/login" element={<UserLogin />} />
        <Route element={<UserProtectedRoute/>}> 
          <Route path="/status" element={<UserUploadStatus />} />
          <Route path="/upload" element={<UserUpload />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<UserLogin />} />
        
        <Route path='/help' element={<HelpComponent />} />
      </Routes>
    </UserLayout>
  );
};

export default UserRoutes;
