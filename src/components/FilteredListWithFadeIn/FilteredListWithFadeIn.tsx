import React from "react";
import { useContextSelector } from "use-context-selector";
import { StateDataContext } from "../../context/StateDataContext.ts";
import FadeIn from "react-fade-in";
import { StoredSingleItem } from "../StoredSingleItem/StoredSingleItem.tsx";

export type FilteredListWithFadeInProps = {
  className?: string;
  items: string[];
};
export const FilteredListWithFadeIn: React.FC<FilteredListWithFadeInProps> = ({
  items,
  className,
}) => {
  const filterQuery = useContextSelector(
    StateDataContext,
    (state) => state.state.filterQuery,
  );

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  return (
    <FadeIn className={className}>
      {filtered.map((key: string) => (
        <StoredSingleItem key={key} name={key} />
      ))}
    </FadeIn>
  );
};
