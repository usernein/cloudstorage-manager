import React, { ReactNode } from "react";
import styles from "./CloudStorageItems.module.scss";
import clsx from "clsx";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinnerDots } from "../../ui-components/LoadingSpinnerDots/LoadingSpinnerDots.tsx";
import { EmptyStorageAlert } from "../EmptyStorageAlert/EmptyStorageAlert.tsx";
import { FilteredListWithFadeIn } from "../FilteredListWithFadeIn/FilteredListWithFadeIn.tsx";
import { useAsyncStorageGetKeys } from "../../hooks/useAsyncStorageGetKeys.ts";
import { useStorageRefreshAllItemsListener } from "../../events";
import { StoredItemsActionsToolBar } from "../StoredItemsActionsToolBar/StoredItemsActionsToolBar.tsx";

export type CloudStorageItemsProps = {
  className?: string;
};

export const CloudStorageItems: React.FC<CloudStorageItemsProps> = ({
  className,
}) => {
  const WebApp = useWebApp();
  const getStorageKeys = useAsyncStorageGetKeys(WebApp);
  const { status, data, error, refetch } = useQuery({
    queryFn: getStorageKeys,
    queryKey: ["get-all-keys"],
    enabled: true,
  });

  useStorageRefreshAllItemsListener(() => {
    refetch().catch(console.error);
  });

  let contentToRender: ReactNode;

  switch (status) {
    case "loading":
      contentToRender = <LoadingSpinnerDots className={"p-10"} />;
      break;

    case "error":
      if (error instanceof Error)
        contentToRender = <div>Error: {error.message}</div>;
      else contentToRender = <div>Error: {JSON.stringify(error)}</div>;
      break;

    case "success":
      if (!Array.isArray(data) || !data?.length) {
        contentToRender = <EmptyStorageAlert />;
        break;
      }
      contentToRender = (
        <>
          <StoredItemsActionsToolBar />
          <FilteredListWithFadeIn
            className={styles.CloudStorageItemsList}
            items={data}
          />
        </>
      );
      break;
    default:
      contentToRender = <div>Unknown error!</div>;
  }

  return (
    <div className={clsx(styles.CloudStorageItems, className)}>
      {contentToRender}
    </div>
  );
};
