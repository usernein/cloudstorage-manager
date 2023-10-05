import React, { ReactNode, useEffect } from "react";
import styles from "./CloudStorageItems.module.scss";
import clsx from "clsx";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useQuery } from "@tanstack/react-query";
import { StoredSingleItem } from "../StoredSingleItem/StoredSingleItem.tsx";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner.tsx";
import { EmptyStorageAlert } from "../EmptyStorageAlert/EmptyStorageAlert.tsx";
import FadeIn from "react-fade-in";
import { useContextSelector } from "use-context-selector";
import { StateDataContext } from "../../context/StateDataContext.ts";

export type CloudStorageItemsProps = {
  className?: string;
};

const useGetStorageKeys = (WebApp: ReturnType<typeof useWebApp>) => {
  return () => {
    return new Promise<string[]>((resolve) => {
      try {
        WebApp.CloudStorage.getKeys((err: Error | null, keys: string[]) => {
          if (err) {
            return resolve(["abc", "def", "ghi"]);
            // return reject(err);
          }
          resolve(keys);
        });
      } catch {
        resolve(["abc", "def", "ghi"]);
      }
    });
  };
};

const FilteredItems = ({ items }: { items: string[] }) => {
  const filterQuery = useContextSelector(
    StateDataContext,
    (state) => state.state.filterQuery,
  );

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  return (
    <FadeIn className={styles.CloudStorageItemsList}>
      {filtered.map((key: string) => (
        <StoredSingleItem key={key} name={key} />
      ))}
    </FadeIn>
  );
};

export const CloudStorageItems: React.FC<CloudStorageItemsProps> = ({
  className,
}) => {
  const WebApp = useWebApp();
  const { status, data, error, refetch } = useQuery({
    queryFn: useGetStorageKeys(WebApp),
    queryKey: [],
    enabled: false,
  });

  useEffect(() => {
    const onNewItem = () => {
      refetch().catch(console.error);
    };

    refetch().catch(console.error);
    window.addEventListener("storage-new-item", onNewItem);

    return () => {
      window.removeEventListener("storage-new-item", onNewItem);
    };
  }, [refetch]);

  let contentToRender: ReactNode;

  switch (status) {
    case "loading":
      contentToRender = <LoadingSpinner />;
      break;

    case "error":
      if (error instanceof Error)
        contentToRender = <div>Error: {error.message}</div>;
      else contentToRender = <div>Error: {JSON.stringify(error)}</div>;
      break;

    case "success":
      if (data?.length === 0) {
        contentToRender = <EmptyStorageAlert />;
        break;
      }
      contentToRender = <FilteredItems items={data} />;
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
