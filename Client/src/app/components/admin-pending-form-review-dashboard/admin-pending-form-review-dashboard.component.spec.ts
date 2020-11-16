import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingFormReviewDashboardComponent } from './admin-pending-form-review-dashboard.component';

describe('AdminPendingFormReviewDashboardComponent', () => {
  let component: AdminPendingFormReviewDashboardComponent;
  let fixture: ComponentFixture<AdminPendingFormReviewDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPendingFormReviewDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingFormReviewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
