import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormLayoutAdminComponent } from './dynamic-form-layout-admin.component';

describe('DynamicFormLayoutAdminComponent', () => {
  let component: DynamicFormLayoutAdminComponent;
  let fixture: ComponentFixture<DynamicFormLayoutAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormLayoutAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormLayoutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
