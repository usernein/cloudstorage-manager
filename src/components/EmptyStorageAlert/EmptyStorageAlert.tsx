import React from "react";
import styles from "./EmptyStorageAlert.module.scss";
import clsx from "clsx";

export type EmptyStorageAlertProps = {
  className?: string;
};
export const EmptyStorageAlert: React.FC<EmptyStorageAlertProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.EmptyStorageAlert, className)}>
      No items in CloudStorage yet.
    </div>
  );
};
