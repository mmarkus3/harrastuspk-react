import { PropsWithChildren, useEffect, useRef } from 'react';

interface ModalDialogProps extends PropsWithChildren {
  isOpen: boolean;
  setIsOpen?: (value: boolean) => void;
  shouldLightDismiss?: boolean;
};

function safelyOpenDialogAsModal(dialog: HTMLDialogElement | null) {
  if (dialog && !dialog.open) {
    dialog.showModal();
  }
}

export function Modal({ isOpen, setIsOpen, shouldLightDismiss, children }: ModalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      safelyOpenDialogAsModal(dialog);
    } else {
      dialog?.close();
    }

    // make sure to close the dialog on unmount
    return () => {
      dialog?.close();
    };
  }, [isOpen]);

  return <dialog className="modal" ref={dialogRef}>
    <div className="modal-box">
      {children}
    </div>
  </dialog>
}