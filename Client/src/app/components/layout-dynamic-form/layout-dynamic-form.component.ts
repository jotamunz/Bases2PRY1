import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../../services/question.service';
import { QuestionBase } from '../../models/question-base';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-dynamic-form',
  templateUrl: './layout-dynamic-form.component.html',
  styleUrls: ['./layout-dynamic-form.component.css'],
})
export class LayoutDynamicFormComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }

  ngOnInit(): void {}
}
