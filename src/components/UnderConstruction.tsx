import React from "react";
import "/node_modules/@uswds/uswds/dist/css/uswds.min.css";

const UnderConstruction: React.FC = () => {
  return (
    <div className="usa-section bg-base-lightest padding-y-6">
      <div className="grid-container">
        <div className="usa-alert usa-alert--warning usa-alert--no-icon">
          <div className="usa-alert__body">
            <h2 className="usa-alert__heading">Under Construction</h2>
            <p className="usa-alert__text">
              Still under construction. Please check back later for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;