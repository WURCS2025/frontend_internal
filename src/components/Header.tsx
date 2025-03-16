import React from 'react';
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import stbLogo from '../assets/stblogo.svg'; // Adjust the path if needed
import './Header.css'; // Import custom styles

const Header: React.FC = () => {
  return (
    <div className="usa-header">
        {/* Logo & Title Wrapper */}
        <div className="header-content">
          <a href="https://www.stb.gov" title="Home" aria-label="Home" className="header-logo-link">
            <img src={stbLogo} alt="STB Logo" className="header-logo" />
          </a>

          <h1 className="usa-logo text-no-wrap text-bold">
            <a href="https://www.stb.gov" title="Home" aria-label="Home">
              WURCS File Upload and Processing Portal
            </a>
          </h1>
        </div>
    </div>
  );
};

export default Header;
