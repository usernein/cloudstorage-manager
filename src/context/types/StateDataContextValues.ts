import { useAppReducer } from "../../store/useAppReducer.ts";

export type StateDataContextValues = {
  state: ReturnType<typeof useAppReducer>["state"];
};
