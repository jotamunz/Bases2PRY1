export class QuestionBase<T> {
  value: string;
  name: string;
  label: string;
  isRequired: boolean;
  component: string;
  expectType: string;
  displayables: { value: string }[];

  constructor(
    options: {
      value?: string;
      name?: string;
      label?: string;
      isRequired?: boolean;
      order?: number;
      component?: string;
      type?: string;
      expectType?: string;
      displayables?: { key: string; value: string }[];
    } = {}
  ) {
    this.value = '';
    this.name = options.name || '';
    this.label = options.label || '';
    this.isRequired = !!options.isRequired;
    this.component = options.component || '';
    this.expectType = options.expectType || '';
    this.displayables = options.displayables || [];
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
