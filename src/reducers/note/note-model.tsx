import { CitizenModel } from "../citizen/citizen-model";

export type NoteModel = {
  note: string;
  citizen: CitizenModel;
};
