import React from "react";
import styles from "./ItemsFilterInput.module.scss";
import clsx from "clsx";
import { useContextSelector } from "use-context-selector";
import { StateApiContext } from "../../context/StateApiContext.ts";

export type ItemsFilterInputProps = {
  className?: string;
};
export const ItemsFilterInput: React.FC<ItemsFilterInputProps> = ({
  className,
}) => {
  const updateState = useContextSelector(
    StateApiContext,
    (state) => state.updateState,
  );
  return (
    <div className={clsx(styles.ItemsFilterInput, className)}>
      <input
        type="text"
        className={styles.filterInput}
        placeholder="Filter CloudStorage items by key..."
        onChange={(e) => {
          updateState({ filterQuery: e.target.value });
        }}
      />
    </div>
  );
};
