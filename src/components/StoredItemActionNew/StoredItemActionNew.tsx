import React, { Suspense } from "react";
import styles from "./StoredItemActionNew.module.scss";
import clsx from "clsx";
import { lazily } from "react-lazily";

const { InputNewItemModal } = lazily(
  () => import("../../modals/InputNewItem/InputNewItemModal.tsx"),
);

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
      <Suspense>
        <InputNewItemModal checkboxId="input-new-item" />
      </Suspense>
    </div>
  );
};
