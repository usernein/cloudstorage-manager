import React, { Suspense } from "react";
import styles from "./App.module.scss";
import clsx from "clsx";
import { StoredItemsActionsToolBar } from "../StoredItemsActionsToolBar/StoredItemsActionsToolBar.tsx";
import { lazily } from "react-lazily";
import { LoadingSpinnerDots } from "../../ui-components/LoadingSpinnerDots/LoadingSpinnerDots.tsx";

const { CloudStorageItems } = lazily(
  () => import("../CloudStorageItems/CloudStorageItems.tsx"),
);

export type AppProps = {
  className?: string;
};
export const App: React.FC<AppProps> = ({ className }) => {
  return (
    <div className={clsx(styles.App, className)}>
      <StoredItemsActionsToolBar />
      <Suspense fallback={<LoadingSpinnerDots className={"p-10"} />}>
        <CloudStorageItems />
      </Suspense>
    </div>
  );
};
