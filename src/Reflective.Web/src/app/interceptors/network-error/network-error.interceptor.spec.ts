import { TestBed } from '@angular/core/testing';

import { NetworkErrorInterceptor } from './network-error.interceptor';

describe('NetworkErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NetworkErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NetworkErrorInterceptor = TestBed.inject(NetworkErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
