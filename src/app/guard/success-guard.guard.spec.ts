import { TestBed } from '@angular/core/testing';

import { SuccessGuardGuard } from './success-guard.guard';

describe('SuccessGuardGuard', () => {
  let guard: SuccessGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SuccessGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
