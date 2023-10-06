import React from "react";
import styles from "./InputNewItemModal.module.scss";
import clsx from "clsx";
import { BaseModal } from "../Base/BaseModal.tsx";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { emitStorageRefreshAllItems } from "../../events";
import { useAsyncStorageSetItem } from "../../hooks/useAsyncStorageSetItem.ts";

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
  const keyRef = React.useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const WebApp = useWebApp();
  const setStorageItem = useAsyncStorageSetItem(WebApp);

  const handleSubmit = async () => {
    try {
      await setStorageItem(key, value);
      emitStorageRefreshAllItems();

      setIsModalOpen(false);
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
        isOpen={isModalOpen}
        onChange={(e) => setIsModalOpen(e)}
      >
        <h2 className={styles.title}>Create new item</h2>
        <div className={styles.body}>
          <label className={styles.inputLabel}>
            <span className={styles.inputLabelText}>Key</span>
            <input
              ref={keyRef}
              type="text"
              className={styles.textInput}
              value={key}
              minLength={1}
              maxLength={128}
              pattern={"[a-zA-Z0-9_\\-]+"}
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
          </label>

          <label className={styles.inputLabel}>
            <span className={styles.inputLabelText}>Value</span>
            <textarea
              className={styles.textAreaInput}
              minLength={0}
              maxLength={4096}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.actionsBar}>
          <button
            className={styles.createButton}
            disabled={!key || !keyRef.current?.validity.valid}
            onClick={() => handleSubmit()}
          >
            Create
          </button>
          <label
            className={styles.cancelButton}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </label>
        </div>
      </BaseModal>
    </div>
  );
};
