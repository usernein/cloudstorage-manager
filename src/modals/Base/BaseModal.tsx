import React, { PropsWithChildren } from "react";

export type BaseModalProps = PropsWithChildren & {
  className?: string;
  checkboxId: string;
  showCloseButton?: boolean;
};
export const BaseModal: React.FC<BaseModalProps> = ({
  className,
  checkboxId,
  showCloseButton = true,
  children,
}) => {
  return (
    <div className={className}>
      <input className="modal-state" id={checkboxId} type="checkbox" />
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
