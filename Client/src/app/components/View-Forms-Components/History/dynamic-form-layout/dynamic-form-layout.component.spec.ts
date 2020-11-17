import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormLayoutComponent } from './dynamic-form-layout.component';

describe('DynamicFormLayoutComponent', () => {
  let component: DynamicFormLayoutComponent;
  let fixture: ComponentFixture<DynamicFormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
