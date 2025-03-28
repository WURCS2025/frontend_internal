import React from 'react';
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";
import stbLogo from '../assets/stblogo.svg'; // Adjust the path if needed
import './Header.css'; // Import custom styles

const Header: React.FC = () => {
  return (
    <div className="usa-header">
      {/* Logo & Title Wrapper */}
      <div className="header-content">
        <a href="https://www.stb.gov" title="Surface Transportation Board Home" aria-label="STB Home" className="header-logo-link">
          <img src={stbLogo} alt="STB Logo" className="header-logo" />
        </a>

        <div className="header-title-wrapper">
          <h1 className="usa-logo text-no-wrap text-bold">
            <a href="/" title="WURCS File Upload and Processing Portal" aria-label="Home" className="header-title">
              WURCS File Upload and Processing Portal
            </a>
          </h1>

          {/* Links under the title */}
          <nav className="header-links">
            <a href="https://www.stb.gov" title="Surface Transportation Board Home" className="header-link">STB Home</a>
            <a href="/help" title="support and help" className="header-link">Help</a>
            <a href="/faq" title="Frequently asked questions" className="header-link">FAQ</a>
            <a href="/analyst/*" title="Admin portal" className="header-link">Analyst</a>
            <a href="/admin/*" title="Admin portal" className="header-link">Admin</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
