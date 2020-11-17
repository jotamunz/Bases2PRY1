import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormPendingComponent } from './dynamic-form-pending.component';

describe('DynamicFormPendingComponent', () => {
  let component: DynamicFormPendingComponent;
  let fixture: ComponentFixture<DynamicFormPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
