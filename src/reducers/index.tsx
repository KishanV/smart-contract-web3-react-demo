import { combineReducers, createStore } from "redux";
import { CitizenController, CitizensState } from "./citizen";

export type ReduxType = {
  citizens: CitizensState;
};

type SyncReduxType = {
  [P in keyof ReduxType]: (
    state: Pick<ReduxType, P> | any,
    action: any
  ) => Pick<ReduxType, P> | any;
};  

const reduxObj: SyncReduxType = {
  citizens: CitizenController.reducer,
};

const reducer = combineReducers(reduxObj);

export const appStore = createStore(reducer);
