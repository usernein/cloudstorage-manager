import { AppBaseState } from "./types/AppBaseState.ts";
import { AppReducerActionType } from "./types/AppReducerActionType.ts";
import React from "react";
import { AppReducer } from "./AppReducer.ts";
import { PartialDeep } from "type-fest";

type useAppReducerReturn = {
  state: AppBaseState;
  updateState: (newStateValues: PartialDeep<AppBaseState>) => void;
};

const useInitialAppState = (): AppBaseState => {
  return {
    filterQuery: "",
  };
};

export const useAppReducer = (): useAppReducerReturn => {
  const initialState = useInitialAppState();

  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  const updateState = (newStateValues: PartialDeep<AppBaseState>) => {
    dispatch({
      type: AppReducerActionType.UPDATE_STATE,
      payload: newStateValues,
    });
  };

  return {
    state: state,
    updateState,
  };
};
