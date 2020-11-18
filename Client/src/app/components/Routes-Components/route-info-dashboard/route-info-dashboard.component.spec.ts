import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteInfoDashboardComponent } from './route-info-dashboard.component';

describe('RouteInfoDashboardComponent', () => {
  let component: RouteInfoDashboardComponent;
  let fixture: ComponentFixture<RouteInfoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteInfoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInfoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
