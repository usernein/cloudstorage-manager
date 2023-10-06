import React from "react";
import styles from "./LoadingSpinnerDots.module.scss";
import clsx from "clsx";

export type LoadingSpinnerProps = {
  className?: string;
};
export const LoadingSpinnerDots: React.FC<LoadingSpinnerProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.LoadingSpinnerDots, className)}>
      <div className="spinner-dot-pulse">
        <div className="spinner-pulse-dot"></div>
      </div>
    </div>
  );
};
