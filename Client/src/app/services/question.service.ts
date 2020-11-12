import { Injectable } from '@angular/core';

//import { DropdownQuestion } from '../models/question-dropdown';
import { QuestionBase } from '../models/question-base';
//import { TextboxQuestion } from '../models/question-textbox';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// This service supply a specific set of questions
// from which to build an individual form

//The QuestionService supplies a set of questions in the form of an array bound to @Input() questions.
export class QuestionService {
  constructor() {} // TODO: import httpClient Service

  // TODO: get from a remote source of question metadata (source MongoDB)

  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new QuestionBase<string>({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        controlType: 'dropdown',
      }),

      new QuestionBase<string>({
        key: 'firstName',
        label: 'First name',
        type: 'email',
        controlType: 'textbox',
      }),

      new QuestionBase<string>({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        controlType: 'textbox',
      }),
    ];

    // return of(questions.sort((a, b) => a.order - b.order));
    return of(questions);
  }
}
