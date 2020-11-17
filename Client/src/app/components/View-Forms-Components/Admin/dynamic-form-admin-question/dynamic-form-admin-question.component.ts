import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

//MODELS
import { QuestionBase } from '../../../../models/question-base';

@Component({
  selector: 'app-dynamic-form-admin-question',
  templateUrl: './dynamic-form-admin-question.component.html',
  styleUrls: ['./dynamic-form-admin-question.component.css'],
})
export class DynamicFormAdminQuestionComponent implements OnInit {
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
