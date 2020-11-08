import { combineReducers, createStore } from "redux";
import { CitizenController, CitizensState } from "./citizen";
import { NoteController, NoteState } from "./note";

export type ReduxType = {
  citizens: CitizensState;
  note: NoteState;
};

type SyncReduxType = {
  [P in keyof ReduxType]: (
    state: Pick<ReduxType, P> | any,
    action: any
  ) => Pick<ReduxType, P> | any;
};

const reduxObj: SyncReduxType = {
  citizens: CitizenController.reducer,
  note: NoteController.reducer,
};

const reducer = combineReducers(reduxObj);

export const appStore = createStore(reducer);
