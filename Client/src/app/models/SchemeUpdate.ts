import { SchemeField } from './SchemeField';


export interface SchemeUpdate {
    _id?: string;
  newName?: string;
  fields?: SchemeField[]; // This are the question base <string>
  oldName?: string
  }