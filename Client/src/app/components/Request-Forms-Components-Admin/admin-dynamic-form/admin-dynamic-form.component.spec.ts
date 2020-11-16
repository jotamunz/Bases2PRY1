import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDynamicFormComponent } from './admin-dynamic-form.component';

describe('AdminDynamicFormComponent', () => {
  let component: AdminDynamicFormComponent;
  let fixture: ComponentFixture<AdminDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDynamicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
