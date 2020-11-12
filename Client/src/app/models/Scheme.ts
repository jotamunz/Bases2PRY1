import { SchemeField } from './SchemeField';

export interface Scheme {
  _id?: string;
  name?: string;
  fields?: SchemeField[];
}
