
import { Routes, Route } from "react-router-dom";
import UserUpload from "../components/user/UserUpload";
import { UserProfile } from "../components/user/UserProfile";
import HelpComponent from "../components/common/HelpComponent";
import AnalystLogin from "../components/analyst/AnalystLogin";
import AnalystUploadStatus from "../components/analyst/AnalystUploadStatus";
import AnalystLayout from "../layouts/AnalystLayout";
import AnalystProtectedRoute from "../components/analyst/AnalystProtectedRoute";

const UserRoutes = () => {
  return (
    
    <AnalystLayout>
      <Routes>
        
        <Route path="/login" element={<AnalystLogin />} />
        <Route element={<AnalystProtectedRoute/>}> 
          <Route path="/status" element={<AnalystUploadStatus />} />
          <Route path="/upload" element={<UserUpload />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<AnalystLogin />} />
        
        <Route path='/help' element={<HelpComponent />} />
      </Routes>
    </AnalystLayout>
  );
};

export default UserRoutes;
