import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormAdminQuestionComponent } from './dynamic-form-admin-question.component';

describe('DynamicFormAdminQuestionComponent', () => {
  let component: DynamicFormAdminQuestionComponent;
  let fixture: ComponentFixture<DynamicFormAdminQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormAdminQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormAdminQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
