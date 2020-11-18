import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnansweredFormsDashboardComponent } from './admin-unanswered-forms-dashboard.component';

describe('AdminUnansweredFormsDashboardComponent', () => {
  let component: AdminUnansweredFormsDashboardComponent;
  let fixture: ComponentFixture<AdminUnansweredFormsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUnansweredFormsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnansweredFormsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
