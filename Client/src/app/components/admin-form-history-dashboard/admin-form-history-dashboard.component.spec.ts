import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormHistoryDashboardComponent } from './admin-form-history-dashboard.component';

describe('AdminFormHistoryDashboardComponent', () => {
  let component: AdminFormHistoryDashboardComponent;
  let fixture: ComponentFixture<AdminFormHistoryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFormHistoryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormHistoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
