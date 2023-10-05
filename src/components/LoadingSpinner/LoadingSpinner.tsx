import React from "react";
import styles from "./LoadingSpinner.module.scss";
import clsx from "clsx";

export type LoadingSpinnerProps = {
  className?: string;
};
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.LoadingSpinner, className)}>
      <div className="spinner-dot-pulse">
        <div className="spinner-pulse-dot"></div>
      </div>
    </div>
  );
};
