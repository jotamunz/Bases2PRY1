import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistoryFormReviewDashboardComponent } from './admin-history-form-review-dashboard.component';

describe('AdminHistoryFormReviewDashboardComponent', () => {
  let component: AdminHistoryFormReviewDashboardComponent;
  let fixture: ComponentFixture<AdminHistoryFormReviewDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHistoryFormReviewDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHistoryFormReviewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
