import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../../../models/question-base';

@Component({
  selector: 'app-admin-dynamic-form-question',
  templateUrl: './admin-dynamic-form-question.component.html',
  styleUrls: ['./admin-dynamic-form-question.component.css'],
})

// Renders the question values of the Obj question
export class AdminDynamicFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/