import { ReactNode, useEffect, useId, useRef } from "react";

export interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ open, title, description, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const descriptionId = description ? `${headingId}-description` : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="m-auto max-w-lg rounded-3xl border border-border/70 bg-card/95 p-8 backdrop:bg-background/80"
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
    >
      <form method="dialog">
        <button
          type="submit"
          className="absolute right-6 top-6 text-sm text-muted-foreground hover:text-foreground focus-ring"
          aria-label="Cerrar modal"
        >
          ×
        </button>
      </form>
      <h2 id={headingId} className="text-2xl font-semibold text-foreground">
        {title}
      </h2>
      {description && (
        <p id={descriptionId} className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-6 space-y-4">{children}</div>
    </dialog>
  );
};

export default Modal;
