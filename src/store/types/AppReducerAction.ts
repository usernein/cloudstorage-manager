import { AppReducerActionType } from "./AppReducerActionType.ts";
import { PartialDeep } from "type-fest";
import { AppBaseState } from "./AppBaseState.ts";

export type AppReducerUpdateStateAction = {
  type: AppReducerActionType.UPDATE_STATE;
  payload: PartialDeep<AppBaseState>;
};

export type AppReducerAction = AppReducerUpdateStateAction;
