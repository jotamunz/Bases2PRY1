import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestDashboardComponent } from './admin-request-dashboard.component';

describe('AdminRequestDashboardComponent', () => {
  let component: AdminRequestDashboardComponent;
  let fixture: ComponentFixture<AdminRequestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRequestDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRequestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
