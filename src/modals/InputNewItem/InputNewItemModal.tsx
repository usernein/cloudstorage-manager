import React from "react";
import styles from "./InputNewItemModal.module.scss";
import clsx from "clsx";
import { BaseModal } from "../../modals/Base/BaseModal.tsx";

export type InputNewItemModalProps = {
  className?: string;
  checkboxId: string;
  showCloseButton?: boolean;
};
export const InputNewItemModal: React.FC<InputNewItemModalProps> = ({
  className,
  checkboxId,
  showCloseButton = false,
}) => {
  return (
    <div className={clsx(styles.InputNewItemModal, className)}>
      <BaseModal checkboxId={checkboxId} showCloseButton={showCloseButton}>
        <h2 className={styles.title}>Create new item</h2>
        <div className={styles.body}>
          <label className={styles.inputLabel}>
            <span className={styles.inputLabelText}>Key</span>
            <input type="text" className={styles.textInput} />
          </label>

          <label className={styles.inputLabel}>
            <span className={styles.inputLabelText}>Value</span>
            <textarea className={styles.textAreaInput} />
          </label>
        </div>
        <div className={styles.actionsBar}>
          <button className={styles.createButton}>Create</button>
          <label className={styles.cancelButton} htmlFor={checkboxId}>
            Cancel
          </label>
        </div>
      </BaseModal>
    </div>
  );
};
