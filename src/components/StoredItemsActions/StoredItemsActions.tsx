import React from "react";
import styles from "./StoredItemsActions.module.scss";
import clsx from "clsx";
import { StoredItemActionNew } from "../StoredItemActionNew/StoredItemActionNew.tsx";

export type StoredItemsActionsProps = {
  className?: string;
};
export const StoredItemsActions: React.FC<StoredItemsActionsProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.StoredItemsActions, className)}>
      <StoredItemActionNew />
    </div>
  );
};
