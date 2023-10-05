import React from "react";
import styles from "./App.module.scss";
import clsx from "clsx";
import { CloudStorageItems } from "../CloudStorageItems/CloudStorageItems.tsx";
import { StoredItemsActions } from "../StoredItemsActions/StoredItemsActions.tsx";

export type AppProps = {
  className?: string;
};
export const App: React.FC<AppProps> = ({ className }) => {
  return (
    <div className={clsx(styles.App, className)}>
      <StoredItemsActions />
      <CloudStorageItems />
    </div>
  );
};
