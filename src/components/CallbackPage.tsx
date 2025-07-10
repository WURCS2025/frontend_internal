import React, { use, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { SESSION_LENGTH } from '../constants';

const CallbackPage: React.FC = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently, user, error } = useAuth0();
  const navigate = useNavigate();
  const { userLogin, userrole, logout } = useAuthStore();
  const setToken = useAuthStore((state) => state.setToken);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  useEffect(() => {
    const processAuth = async () => {
      console.log("Processing authentication callback...");
      localStorage.setItem("user", user?.email || user?.name || "");
      // localStorage.setItem("token", data.token);
      const expiration = Date.now() + SESSION_LENGTH * 30 * 1000; // 30 minutes expiration
      localStorage.setItem("expiration", expiration.toString());
      localStorage.setItem("userrole", "analyst");
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        setToken(token);
        console.log("Token received:", token);
        setUserInfo(user.email || user.name || "", "analyst");
        navigate("/analyst/status");
      }
    };

    if (!isLoading) {
      processAuth();
    }
  }, [isLoading, isAuthenticated, getAccessTokenSilently, setToken, setUserInfo, user, navigate]);

  if (isLoading) return <div>Processing login... Please wait.</div>;
  if (error) return <div>Authentication error: {error.message}</div>;
  return <div>Login successful. Redirecting...</div>;
};

export default CallbackPage;
