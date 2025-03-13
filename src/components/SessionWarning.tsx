import React from "react";

interface SessionWarningProps {
  onContinue: () => void;
  onLogout: () => void;
}

const SessionWarning: React.FC<SessionWarningProps> = ({ onContinue, onLogout }) => {
  return (
    <div className="session-warning-overlay">
      <div className="session-warning">
        <p>Your session is about to expire. Do you want to continue?</p>
        <button className="usa-button" onClick={onContinue}>
          Yes, Continue Session
        </button>
        <button className="usa-button usa-button--secondary" onClick={onLogout}>
          No, Logout
        </button>
      </div>
    </div>
  );
};

export default SessionWarning;
