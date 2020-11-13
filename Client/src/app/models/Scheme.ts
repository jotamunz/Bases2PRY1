import { SchemeField } from './SchemeField';

export interface Scheme {
  _id?: string;
  name?: string;
  fields?: SchemeField[]; // This are the question base <string>
}
