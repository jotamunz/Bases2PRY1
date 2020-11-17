import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUnansweredFormsDashboardComponent } from './user-unanswered-forms-dashboard.component';

describe('UserUnansweredFormsDashboardComponent', () => {
  let component: UserUnansweredFormsDashboardComponent;
  let fixture: ComponentFixture<UserUnansweredFormsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUnansweredFormsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUnansweredFormsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
