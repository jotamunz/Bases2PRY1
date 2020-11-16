import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutDynamicFormComponent } from './admin-layout-dynamic-form.component';

describe('AdminLayoutDynamicFormComponent', () => {
  let component: AdminLayoutDynamicFormComponent;
  let fixture: ComponentFixture<AdminLayoutDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLayoutDynamicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
