import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

// MODELS
import { QuestionBase } from '../../../../models/question-base';
import { Form } from '../../../../models/Form';

// SERVICES
import { QuestionControlService } from '../../../../services/Form-Request-Services/question-control.service';

import { AuthService } from '../../../../services/auth.service';
import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-dynamic-form-admin',
  templateUrl: './dynamic-form-admin.component.html',
  styleUrls: ['./dynamic-form-admin.component.css'],
})
export class DynamicFormAdminComponent implements OnInit {
  @Input() questions: QuestionBase<string>[];
  @Input() schemeName: string;

  //variables
  form: FormGroup;
  fields: any[] = [];

  public mongoForm: Form = {
    schemeName: '',
    userUsername: '',
    responses: [],
  };

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private formService: FormService,
    private qcs: QuestionControlService
  ) {}

  getFieldValues() {
    let fieldName = '';
    let value = '';
    let values = this.form.getRawValue();

    this.questions.forEach((field) => {
      fieldName = field.name;
      value = values[fieldName];

      this.fields.push({ name: fieldName, value: value });
    });
  }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  // Todo: approve in MongoDB
  onApprove() {
    console.log('You got approve');
  }

  // Todo: approve in MongoDB
  onReject() {
    console.log('You got rejected son');
  }
}
