import { TestBed } from '@angular/core/testing';

import { ActivityPlansService } from './activity-plans.service';

describe('ActivityPlansService', () => {
  let service: ActivityPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
