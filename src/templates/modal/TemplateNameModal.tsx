import React from "react";
import styles from "./TemplateNameModal.module.scss";
import clsx from "clsx";
import { BaseModal } from "../../modals/Base/BaseModal.tsx";

export type TemplateNameModalProps = {
  className?: string;
  checkboxId: string;
  showCloseButton?: boolean;
};
export const TemplateNameModal: React.FC<TemplateNameModalProps> = ({
  className,
  checkboxId,
  showCloseButton = false,
}) => {
  return (
    <div className={clsx(styles.TemplateNameModal, className)}>
      <BaseModal checkboxId={checkboxId} showCloseButton={showCloseButton}>
        <h2 className="text-xl">Modal title 3</h2>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          dolorum voluptate ratione dicta. Maxime cupiditate, est commodi
          consectetur earum iure, optio, obcaecati in nulla saepe maiores nobis
          iste quasi alias!
        </span>
        <div className="flex gap-3">
          <button className="btn btn-error btn-block">Delete</button>
          <button className="btn btn-block">Cancel</button>
        </div>
      </BaseModal>
    </div>
  );
};
