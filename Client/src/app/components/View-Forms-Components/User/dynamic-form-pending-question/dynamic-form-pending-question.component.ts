import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

//MODELS
import { QuestionBase } from '../../../../models/question-base';

@Component({
  selector: 'app-dynamic-form-pending-question',
  templateUrl: './dynamic-form-pending-question.component.html',
  styleUrls: ['./dynamic-form-pending-question.component.css'],
})
export class DynamicFormPendingQuestionComponent implements OnInit {
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
