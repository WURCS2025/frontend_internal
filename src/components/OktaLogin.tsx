// App.tsx or a component
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import type { LogoutOptions } from '@auth0/auth0-react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import "../../css/Sidebar.css"; // Custom styles for sidebar

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  React.useEffect(() => {
    loginWithRedirect();
  }, []);
  return <div>Redirecting to login...</div>;
};

export const LogoutPage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth0();
  React.useEffect(() => {
    logout({ returnTo: window.location.origin } as LogoutOptions);
  }, []);
  return <div>Logging out...</div>;
};

export const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Vite + React + TypeScript</h1>
      <p>Welcome to your Vite app. Use the navigation to test Auth0 login, logout, and API calls.</p>
      <ul>
        <li><a href="/login">Login</a></li>
        <li><a href="/logout">Logout</a></li>
        <li><a href="/call-api">Call API</a></li>
      </ul>
    </div>
  );
};

export const OktaComponent: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  const callApi = async () => {
    const token = await getAccessTokenSilently();
    const res = await fetch('https://localhost:5001/api/secure', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
  };



  return (
    <div className="grid-container usa-prose narrow-container">

      {!isAuthenticated && <button className="usa-button usa-button--secondary logout-button" onClick={() => loginWithRedirect()}>Log In</button>}
      {isAuthenticated && (
        <>
          <button className="usa-button usa-button--secondary logout-button" onClick={() => logout({ returnTo: window.location.origin } as LogoutOptions)}>Log Out</button>
        </>
      )}
    </div>
  );
}
