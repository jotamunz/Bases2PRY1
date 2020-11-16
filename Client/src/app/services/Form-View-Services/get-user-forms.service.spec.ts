import { TestBed } from '@angular/core/testing';

import { GetUserFormsService } from './get-user-forms.service';

describe('GetUserFormsService', () => {
  let service: GetUserFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
