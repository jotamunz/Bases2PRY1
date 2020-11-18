import { TestBed } from '@angular/core/testing';

import { RoutePreviewService } from './route-preview.service';

describe('RoutePreviewService', () => {
  let service: RoutePreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutePreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
