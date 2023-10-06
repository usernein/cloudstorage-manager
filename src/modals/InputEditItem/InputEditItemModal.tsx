import React, { useEffect } from "react";
import styles from "./InputEditItemModal.module.scss";
import clsx from "clsx";
import { BaseModal } from "../Base/BaseModal.tsx";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { Trash } from "@phosphor-icons/react";
import { useAsyncStorageSetItem } from "../../hooks/useAsyncStorageSetItem.ts";
import { useAsyncStorageRemoveItem } from "../../hooks/useAsyncStorageRemoveItem.ts";
import {
  emitStorageItemUpdated,
  emitStorageRefreshAllItems,
} from "../../events";
import { CopyToClipboard } from "../../components/CopyToClipboard/CopyToClipboard.tsx";

export type InputEditItemModalProps = {
  className?: string;
  checkboxId: string;
  showCloseButton?: boolean;
  itemKey: string;
  actualValue: string;
};
export const InputEditItemModal: React.FC<InputEditItemModalProps> = ({
  className,
  checkboxId,
  showCloseButton = false,
  itemKey,
  actualValue,
}) => {
  const [value, setValue] = React.useState(actualValue);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const WebApp = useWebApp();

  useEffect(() => {
    setValue(actualValue);
  }, [actualValue]);

  const setStorageItem = useAsyncStorageSetItem(WebApp);
  const removeStorageItem = useAsyncStorageRemoveItem(WebApp);

  const handleSubmit = async () => {
    try {
      await setStorageItem(itemKey, value);
      emitStorageItemUpdated({ key: itemKey, value });

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await removeStorageItem(itemKey);
      emitStorageRefreshAllItems();

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={clsx(styles.InputEditItemModal, className)}>
      <BaseModal
        checkboxId={checkboxId}
        showCloseButton={showCloseButton}
        isOpen={isModalOpen}
        onChange={(e) => setIsModalOpen(e)}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isDeleting ? "Delete" : "Edit"} item{" "}
            <span className={styles.itemKey}>{itemKey}</span>
          </h2>
          <button
            className={clsx(styles.deleteIcon, isDeleting && styles.active)}
            onClick={() => setIsDeleting(!isDeleting)}
          >
            <Trash size={16} weight="light" />
          </button>
        </div>
        <div className={styles.body}>
          <label
            className={clsx(styles.inputLabel, isDeleting && styles.disabled)}
          >
            <span className={styles.inputLabelHeader}>
              <span className={styles.inputLabelText}>Value</span>
              <CopyToClipboard
                size={20}
                className={styles.copyIcon}
                copiedClassName={styles.copiedIcon}
                text={value}
              />
            </span>
            <textarea
              disabled={isDeleting}
              className={styles.textAreaInput}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.actionsBar}>
          <button
            className={clsx(
              isDeleting ? styles.deleteButton : styles.createButton,
            )}
            disabled={!isDeleting && (!value || value == actualValue)}
            onClick={() => (isDeleting ? handleDelete() : handleSubmit())}
          >
            {isDeleting ? "Delete" : "Save"}
          </button>
          <label
            className={styles.cancelButton}
            onClick={() =>
              isDeleting ? setIsDeleting(false) : setIsModalOpen(false)
            }
          >
            Cancel
          </label>
        </div>
      </BaseModal>
    </div>
  );
};
