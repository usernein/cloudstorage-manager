import React from "react";
import styles from "./StoredItemsActionsToolBar.module.scss";
import clsx from "clsx";
import { StoredItemActionNew } from "../StoredItemActionNew/StoredItemActionNew.tsx";
import { ItemsFilterInput } from "../ItemsFilterInput/ItemsFilterInput.tsx";

export type StoredItemsActionsProps = {
  className?: string;
};
export const StoredItemsActionsToolBar: React.FC<StoredItemsActionsProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.StoredItemsActionsToolBar, className)}>
      <ItemsFilterInput />
      <StoredItemActionNew />
    </div>
  );
};
