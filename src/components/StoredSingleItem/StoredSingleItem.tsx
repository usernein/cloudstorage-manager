import React from "react";
import styles from "./StoredSingleItem.module.scss";
import clsx from "clsx";
import { InputEditItemModal } from "../../modals/InputEditItem/InputEditItemModal.tsx";
import Ripple from "../../ui-components/Ripple/Ripple.tsx";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useQuery } from "@tanstack/react-query";
import FadeIn from "react-fade-in";
import { useAsyncStorageGetSingleItem } from "../../hooks/useAsyncStorageGetSingleItem.ts";
import { useStorageItemUpdatedListener } from "../../events";

export type StoredSingleItemProps = {
  className?: string;
  name: string;
};

export const StoredSingleItem: React.FC<StoredSingleItemProps> = ({
  className,
  name,
}) => {
  const WebApp = useWebApp();
  const getItemValue = useAsyncStorageGetSingleItem(WebApp);

  const { status, data, error, refetch } = useQuery({
    queryFn: () => getItemValue(name),
    queryKey: ["get-key", name],
    enabled: true,
  });

  useStorageItemUpdatedListener(({ key }) => {
    if (key === name) {
      refetch().catch(console.error);
    }
  });

  let valueToRender: string;
  switch (status) {
    case "loading":
      valueToRender = "...";
      break;
    case "error":
      valueToRender = "Error to read value";
      if (error instanceof Error) {
        valueToRender = "Error to read value: " + error.message;
      }
      break;
    case "success":
      valueToRender = data;
      break;
    default:
      valueToRender = "Unknown error to read value";
      break;
  }

  return (
    <div>
      <InputEditItemModal
        itemKey={name}
        checkboxId={name}
        actualValue={valueToRender}
      />
      <FadeIn>
        <Ripple>
          <label
            htmlFor={name}
            className={clsx(styles.StoredSingleItem, className)}
          >
            <div className={styles.title}>
              <span className={styles.titleText}>{name}</span>
            </div>
            <span className={styles.value}>{valueToRender}</span>
          </label>
        </Ripple>
      </FadeIn>
    </div>
  );
};
