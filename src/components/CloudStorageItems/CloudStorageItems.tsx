import React, { ReactNode } from "react";
import styles from "./CloudStorageItems.module.scss";
import clsx from "clsx";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useQuery } from "@tanstack/react-query";
import { StoredSingleItem } from "../StoredSingleItem/StoredSingleItem.tsx";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner.tsx";
import { EmptyStorageAlert } from "../EmptyStorageAlert/EmptyStorageAlert.tsx";
import FadeIn from "react-fade-in";

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

export const CloudStorageItems: React.FC<CloudStorageItemsProps> = ({
  className,
}) => {
  const WebApp = useWebApp();
  const { status, data, error } = useQuery({
    queryFn: useGetStorageKeys(WebApp),
    queryKey: [],
  });

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
      contentToRender = data.map((key: string) => (
        <StoredSingleItem key={key} name={key} />
      ));
      break;
    default:
      contentToRender = <div>Unknown error!</div>;
  }

  return (
    <FadeIn className={clsx(styles.CloudStorageItems, className)}>
      {contentToRender}
    </FadeIn>
  );
};
