import { useAppReducer } from "../store/useAppReducer.ts";
import React, { PropsWithChildren } from "react";
import { StateDataContext } from "./StateDataContext.ts";
import { StateApiContext } from "./StateApiContext.ts";

export const AppContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { state, updateState } = useAppReducer();

  return (
    <StateApiContext.Provider value={{ updateState }}>
      <StateDataContext.Provider value={{ state }}>
        {children}
      </StateDataContext.Provider>
    </StateApiContext.Provider>
  );
};
