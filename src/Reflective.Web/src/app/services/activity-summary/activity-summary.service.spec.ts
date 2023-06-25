import { TestBed } from '@angular/core/testing';

import { ActivitySummaryService } from './activity-summary.service';

describe('ActivitySummaryService', () => {
  let service: ActivitySummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitySummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
