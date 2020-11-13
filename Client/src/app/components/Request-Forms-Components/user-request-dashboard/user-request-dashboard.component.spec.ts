import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestDashboardComponent } from './user-request-dashboard.component';

describe('UserRequestDashboardComponent', () => {
  let component: UserRequestDashboardComponent;
  let fixture: ComponentFixture<UserRequestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
