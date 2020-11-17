import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormLayoutPendingComponent } from './dynamic-form-layout-pending.component';

describe('DynamicFormLayoutPendingComponent', () => {
  let component: DynamicFormLayoutPendingComponent;
  let fixture: ComponentFixture<DynamicFormLayoutPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormLayoutPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormLayoutPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
