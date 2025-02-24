import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
// import './index.scss'; // Import the SCSS file

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);