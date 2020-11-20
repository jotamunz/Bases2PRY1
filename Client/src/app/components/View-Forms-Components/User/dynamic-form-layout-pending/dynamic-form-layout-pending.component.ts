import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

//SERVICES
import { UserService } from '../../../../services/user.service';
import { FormService } from '../../../../services/form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../../services/Form-Request-Services/question.service';
//MODELS
import { Scheme } from '../../../../models/Scheme';
import { QuestionBase } from '../../../../models/question-base';

@Component({
  selector: 'app-dynamic-form-layout-pending',
  templateUrl: './dynamic-form-layout-pending.component.html',
  styleUrls: ['./dynamic-form-layout-pending.component.css'],
})
export class DynamicFormLayoutPendingComponent implements OnInit {
  //Variables
  questions$: Observable<QuestionBase<any>[]>; //obs de array de fields
  questions: QuestionBase<any>[] = []; // array de fields
  schemaInfo: any;
  public schemaFields: Scheme = null;

  constructor(
    private serviceQuestion: QuestionService,
    private userService: UserService,
    private formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadFormSchema();
  }

  public loadFormSchema() {
    this.activatedRoute.params.subscribe((params) => {
      const schemaInfo = params;
      this.schemaInfo = schemaInfo;
      console.log(schemaInfo);
      this.formService
        .getFormBySchemeUser(
          schemaInfo.username,
          schemaInfo.schemaName,
          schemaInfo.createDate
        )
        .subscribe((scheme: any) => {
          scheme.responses.forEach((question) => {
            this.questions.push(new QuestionBase<any>(question));
            console.log('View question');
            console.log(this.questions);
            console.log('View question');
          });
        });
    });
  }
}
