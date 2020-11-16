import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDynamicFormQuestionComponent } from './admin-dynamic-form-question.component';

describe('AdminDynamicFormQuestionComponent', () => {
  let component: AdminDynamicFormQuestionComponent;
  let fixture: ComponentFixture<AdminDynamicFormQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDynamicFormQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDynamicFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
