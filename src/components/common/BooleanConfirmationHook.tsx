// useConfirmation.tsx
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

type ConfirmOptions = {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const useConfirmation = () => {
  const [modalProps, setModalProps] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<(value: boolean) => void>(() => () => {});

  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    setModalProps(options);
    return new Promise((resolve) => setResolver(() => resolve));
  };

  const handleConfirm = () => {
    resolver(true);
    setModalProps(null);
  };

  const handleCancel = () => {
    resolver(false);
    setModalProps(null);
  };

  const Confirmation = modalProps ? (
    <ConfirmationModal
      isOpen={true}
      title={modalProps.title}
      description={modalProps.description}
      confirmLabel={modalProps.confirmLabel}
      cancelLabel={modalProps.cancelLabel}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  ) : null;

  return { confirm, Confirmation };
};
