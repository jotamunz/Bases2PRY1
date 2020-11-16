import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormHistoryDashboardComponent } from './user-form-history-dashboard.component';

describe('UserFormHistoryDashboardComponent', () => {
  let component: UserFormHistoryDashboardComponent;
  let fixture: ComponentFixture<UserFormHistoryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormHistoryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormHistoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
