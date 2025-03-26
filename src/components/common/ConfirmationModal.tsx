import React from "react";
import './ConfimrationModal.css'; // Import your CSS file

interface ConfirmationModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  description,
  isOpen,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="usa-modal-wrapper is-visible custom-top-right-modal custom-modal-right-of-table">
      <div
        className="usa-modal custom-modal-box"
        role="dialog"
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <div className="usa-modal__content">
          <h2 className="usa-modal__heading" id="confirmation-modal-title">
            {title}
          </h2>
          <p id="confirmation-modal-description">{description}</p>
          <div className="usa-modal__footer">
            <button className="usa-button" onClick={onConfirm}>
              {confirmLabel}
            </button>
            <button
              className="usa-button usa-button--unstyled padding-105 text-center"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          </div>
        </div>
        {cancelLabel && cancelLabel.trim() !== "" && (
          <button
            className="usa-button usa-modal__close"
            aria-label="Close this window"
            onClick={onCancel}
          >
            <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
              <use xlinkHref="/uswds/img/sprite.svg#close"></use>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
