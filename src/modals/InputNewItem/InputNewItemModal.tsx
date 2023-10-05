import React from "react";
import styles from "./InputNewItemModal.module.scss";
import clsx from "clsx";
import { BaseModal } from "../Base/BaseModal.tsx";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";

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
  const [key, setKey] = React.useState("");
  const [value, setValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const WebApp = useWebApp();

  const createItem = () => {
    return new Promise<boolean>((resolve, reject) => {
      WebApp.CloudStorage.setItem(key, value, (err: Error | null) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  };

  const handleSubmit = async () => {
    try {
      await createItem();
      window.dispatchEvent(new Event("storage-new-item"));

      setIsOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setKey("");
      setValue("");
    }
  };

  return (
    <div className={clsx(styles.InputNewItemModal, className)}>
      <BaseModal
        checkboxId={checkboxId}
        showCloseButton={showCloseButton}
        isOpen={isOpen}
        onChange={(e) => setIsOpen(e)}
      >
        <h2 className={styles.title}>Create new item</h2>
        <div className={styles.body}>
          <label className={styles.inputLabel}>
            <span className={styles.inputLabelText}>Key</span>
            <input
              type="text"
              className={styles.textInput}
              defaultValue={key}
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
          </label>

          <label className={styles.inputLabel}>
            <span className={styles.inputLabelText}>Value</span>
            <textarea
              className={styles.textAreaInput}
              defaultValue={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.actionsBar}>
          <button
            className={styles.createButton}
            disabled={!key || !value}
            onClick={() => handleSubmit()}
          >
            Create
          </button>
          <label
            className={styles.cancelButton}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </label>
        </div>
      </BaseModal>
    </div>
  );
};
