import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Auth0Provider } from "@auth0/auth0-react";
import "../node_modules/@uswds/uswds/dist/css/uswds.min.css";
import "../node_modules/@uswds/uswds/dist/js/uswds.min.js"// Import USWDS JS

// import './index.scss'; // Import the SCSS file



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-i8unhg84z8o1xzvl.us.auth0.com"
    clientId="JKrI2ZYaeQwF5PkOhOcEnLXTNda2tHSC"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/callback",
      audience: "https://dev-i8unhg84z8o1xzvl.us.auth0.com/api/v2/", // optional, if validating API
    }}
  >
    <App />
  </Auth0Provider>
);
