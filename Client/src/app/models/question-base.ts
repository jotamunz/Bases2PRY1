export class QuestionBase<T> {
  value: T;
  name: string;
  label: string;
  required: boolean;
  component: string;
  type: string;
  displayables: { value: string }[];

  constructor(
    options: {
      value?: T;
      name?: string;
      label?: string;
      required?: boolean;
      order?: number;
      component?: string;
      type?: string;
      displayables?: { key: string; value: string }[];
    } = {}
  ) {
    this.value = options.value;
    this.name = options.name || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.component = options.component || '';
    this.type = options.type || '';
    this.displayables = options.displayables || [];
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
