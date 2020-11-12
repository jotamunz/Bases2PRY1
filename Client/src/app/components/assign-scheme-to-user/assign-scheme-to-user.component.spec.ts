import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSchemeToUserComponent } from './assign-scheme-to-user.component';

describe('AssignSchemeToUserComponent', () => {
  let component: AssignSchemeToUserComponent;
  let fixture: ComponentFixture<AssignSchemeToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignSchemeToUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSchemeToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
