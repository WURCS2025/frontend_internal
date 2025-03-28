import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = "Yes",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="modal-actions">
          <button className="usa-button" onClick={onConfirm}>
            {confirmLabel}
          </button>
          {cancelLabel && (
            <button className="usa-button usa-button--secondary" onClick={onCancel}>
              {cancelLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
