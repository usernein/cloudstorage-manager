import React from "react";
import styles from "./App.module.scss";
import clsx from "clsx";
import { CloudStorageItems } from "../CloudStorageItems/CloudStorageItems.tsx";
import { StoredItemsActionsToolBar } from "../StoredItemsActionsToolBar/StoredItemsActionsToolBar.tsx";

export type AppProps = {
  className?: string;
};
export const App: React.FC<AppProps> = ({ className }) => {
  return (
    <div className={clsx(styles.App, className)}>
      <StoredItemsActionsToolBar />
      <CloudStorageItems />
    </div>
  );
};
