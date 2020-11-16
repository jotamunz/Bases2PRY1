import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnsweredFormsDashboardComponent } from './user-answered-forms-dashboard.component';

describe('UserAnsweredFormsDashboardComponent', () => {
  let component: UserAnsweredFormsDashboardComponent;
  let fixture: ComponentFixture<UserAnsweredFormsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAnsweredFormsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnsweredFormsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
