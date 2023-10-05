import { AppReducerAction } from "./types/AppReducerAction.ts";
import { AppReducerActionType } from "./types/AppReducerActionType.ts";
import tsDeepmerge from "ts-deepmerge";
import { PartialDeep } from "type-fest";
import { AppBaseState } from "./types/AppBaseState.ts";

const mergeIntoState = (
  current: AppBaseState,
  newValues: PartialDeep<AppBaseState>,
): AppBaseState => {
  return tsDeepmerge.withOptions(
    { mergeArrays: true },
    current,
    newValues,
  ) as AppBaseState;
};
export const AppReducer = (state: AppBaseState, action: AppReducerAction) => {
  if (action.type !== AppReducerActionType.UPDATE_STATE) {
    return state;
  }

  return mergeIntoState(state, action.payload);
};
