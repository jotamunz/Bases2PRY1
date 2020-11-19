import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormAdminComponent } from './dynamic-form-admin.component';

describe('DynamicFormAdminComponent', () => {
  let component: DynamicFormAdminComponent;
  let fixture: ComponentFixture<DynamicFormAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
