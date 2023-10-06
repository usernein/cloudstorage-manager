import React from "react";
import styles from "./LoadingSpinnerRing.module.scss";
import clsx from "clsx";

export type LoadingSpinnerProps = {
  className?: string;
};
export const LoadingSpinnerRing: React.FC<LoadingSpinnerProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.LoadingSpinnerRing, className)}>
      <svg className="spinner-ring" viewBox="25 25 50 50" strokeWidth="5">
        <circle cx="50" cy="50" r="20" />
      </svg>
    </div>
  );
};
