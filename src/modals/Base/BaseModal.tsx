import React, { PropsWithChildren } from "react";

export type BaseModalProps = PropsWithChildren & {
  className?: string;
  checkboxId: string;
  showCloseButton?: boolean;
  isOpen?: boolean;
  onChange?: (e: boolean) => void;
};
export const BaseModal: React.FC<BaseModalProps> = ({
  className,
  checkboxId,
  showCloseButton = true,
  children,
  isOpen,
  onChange,
}) => {
  return (
    <div className={className}>
      <input
        className="modal-state"
        id={checkboxId}
        type="checkbox"
        checked={isOpen}
        onChange={(e) => (onChange ? onChange(e.target.checked) : null)}
      />
      <div className="modal">
        <label className="modal-overlay"></label>
        <div className="modal-content flex flex-col gap-5 bg-background text-text">
          {showCloseButton && (
            <label
              htmlFor={checkboxId}
              className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost text-buttonText hover:bg-button"
            >
              ✕
            </label>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
