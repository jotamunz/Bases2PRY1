import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

// MODELS
import { QuestionBase } from '../../../../models/question-base';
import { Form } from '../../../../models/Form';
import { UpdateForm } from '../../../../models/UpdateForm';


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

  public updateForm : UpdateForm = {
    approverUsername : "",
    authorUsername : "",
    date : "",
    decision : "",
    schemeName : ""
  }

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private formService: FormService,
    private qcs: QuestionControlService,
    private activatedRoute : ActivatedRoute
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

  public loadUpdateForm(decision : string): void{
    this.updateForm.approverUsername = this.authService.getCurrentUser().username;
    this.activatedRoute.params.subscribe(response =>{
      this.updateForm.authorUsername = response.username;
      this.updateForm.date = response.createDate;
      this.updateForm.schemeName = response.schemeName;
    })
    this.updateForm.decision = decision;
    

  }

  // Todo: approve in MongoDB
  onApprove() {
    this.loadUpdateForm("1");

    this.formService.updateDecision(this.updateForm).subscribe(
      (res) => {
        this.flashMessagesService.show("Form has been accepted", {
          cssClass: 'alert success-alert',
        });
        this.router.navigateByUrl('/admin/pendingReviewDashboard');
      },
      (error) => {
        this.flashMessagesService.show(error.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );
  }

  // Todo: approve in MongoDB
  onReject() {
    this.loadUpdateForm("2");

    this.formService.updateDecision(this.updateForm).subscribe(
      (res) => {
        this.flashMessagesService.show("Form has been rejected", {
          cssClass: 'alert success-alert',
        });
        this.router.navigateByUrl('/admin/pendingReviewDashboard');
      },
      (error) => {
        this.flashMessagesService.show(error.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );
  }
}
