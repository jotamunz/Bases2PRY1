import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { QuestionBase } from '../../models/question-base';

import { of } from 'rxjs';

import { Scheme } from '../../models/Scheme';
import { Router, ActivatedRoute } from '@angular/router';
import { SchemeService } from '../scheme.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})

// This service supply a specific set of questions
// from which to build an individual form

//The QuestionService supplies a set of questions in the form of an array bound to @Input() questions.
export class QuestionService {
  authService: AuthService;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private schemeService: SchemeService
  ) {} // TODO: import httpClient Service

  // TODO: get from a remote source of question metadata (source MongoDB)

  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new QuestionBase<string>({
        name: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        component: 'dropdown',
      }),

      new QuestionBase<string>({
        name: 'firstName',
        label: 'First name',
        type: 'email',
        component: 'textbox',
      }),

      new QuestionBase<string>({
        name: 'emailAddress',
        label: 'Email',
        type: 'email',
        component: 'textbox',
      }),

      new QuestionBase<string>({
        name: 'algo',
        component: 'textbox',
      }),
    ];

    return of(questions);
  }
}
