import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDynamicFormComponent } from './layout-dynamic-form.component';

describe('LayoutDynamicFormComponent', () => {
  let component: LayoutDynamicFormComponent;
  let fixture: ComponentFixture<LayoutDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutDynamicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
