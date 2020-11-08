import { NoteModel } from "./note-model";

export const NoteActionTypes = {
  Set: "Note_Set",
};

export type NoteState = {
  data?: NoteModel;
};

export class NoteController {
  static value: NoteState = {
    data: undefined,
  };

  static reducer(state = NoteController.value, action: any) {
    if (action && action.type === NoteActionTypes.Set) {
      state = {
        ...state,
        data: action.data,
      };
    }
    return state;
  }

  static setData(data: NoteModel) {
    return {
      type: NoteActionTypes.Set,
      data,
    };
  }
}
