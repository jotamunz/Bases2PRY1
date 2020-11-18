import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteReviewComponent } from './route-review.component';

describe('RouteReviewComponent', () => {
  let component: RouteReviewComponent;
  let fixture: ComponentFixture<RouteReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
