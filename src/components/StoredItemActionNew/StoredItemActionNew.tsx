import React from "react";
import styles from "./StoredItemActionNew.module.scss";
import clsx from "clsx";
import { InputNewItemModal } from "../../modals/InputNewItem/InputNewItemModal.tsx";

export type StoredItemActionNewProps = {
  className?: string;
};
export const StoredItemActionNew: React.FC<StoredItemActionNewProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.StoredItemActionNew, className)}>
      <label className={styles.button} htmlFor="input-new-item">
        New
      </label>
      <InputNewItemModal checkboxId="input-new-item" />
    </div>
  );
};
