import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormSchemeComponent } from './add-form-scheme.component';

describe('AddFormSchemeComponent', () => {
  let component: AddFormSchemeComponent;
  let fixture: ComponentFixture<AddFormSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
