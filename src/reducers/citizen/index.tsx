import { CitizenModel } from "./citizen-model";

export const CitizenActionTypes = {
  Set: "Categories_Set",
};

export type CitizensState = {
  list?: CitizenModel[];
};

export class CitizenController {
  static value: CitizensState = {
    list: undefined,
  };

  static reducer(state = CitizenController.value, action: any) {
    if (action && action.type === CitizenActionTypes.Set) {
      state = {
        ...state,
        list: action.list,
      };
    }
    return state;
  }

  static setData(list: CitizenModel[]) {
    return {
      type: CitizenActionTypes.Set,
      list,
    };
  }
}
