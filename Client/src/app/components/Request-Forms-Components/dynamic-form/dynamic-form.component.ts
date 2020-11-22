import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

// MODELS
import { QuestionBase } from '../../../models/question-base';
import { Form } from '../../../models/Form';

// SERVICES
import { QuestionControlService } from '../../../services/Form-Request-Services/question-control.service';

import { AuthService } from '../../../services/auth.service';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[];
  @Input() schemeName: string;
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
    this.fields = []
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

  // Todo: submit data to MongoDB
  onSubmit() {
    this.getFieldValues();
    this.mongoForm.responses = this.fields;
    this.mongoForm.schemeName = this.schemeName;
    this.mongoForm.userUsername = this.authService.getCurrentUser().username;

    console.log(this.mongoForm);

    this.formService.registerNewForm(this.mongoForm).subscribe(
      (res) => {
        this.flashMessagesService.show(`The form has been sent successfully`, {
          cssClass: 'alert success-alert',
        });
        this.router.navigateByUrl('/user/form/dashboard');
      },
      (err) => {
        this.flashMessagesService.show(err.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );
  }
}
