import { SchemeField } from './SchemeField';


export interface SchemeUpdate {
    _id?: string;
  name?: string;
  fields?: SchemeField[]; // This are the question base <string>
  oldName?: string
  }