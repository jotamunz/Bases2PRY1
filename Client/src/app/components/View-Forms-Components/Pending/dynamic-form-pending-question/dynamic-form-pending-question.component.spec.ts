import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormPendingQuestionComponent } from './dynamic-form-pending-question.component';

describe('DynamicFormPendingQuestionComponent', () => {
  let component: DynamicFormPendingQuestionComponent;
  let fixture: ComponentFixture<DynamicFormPendingQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormPendingQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormPendingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
