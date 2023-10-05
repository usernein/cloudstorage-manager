import React from "react";
import styles from "./StoredSingleItem.module.scss";
import clsx from "clsx";

export type StoredSingleItemProps = {
  className?: string;
  name: string;
};
export const StoredSingleItem: React.FC<StoredSingleItemProps> = ({
  className,
  name,
}) => {
  return (
    <div className={clsx(styles.StoredSingleItem, className)}>
      <span className={styles.title}>{name}</span>
      <span className={styles.value}>{name}</span>
      <span className={styles.icon}>🗑</span>
    </div>
  );
};
