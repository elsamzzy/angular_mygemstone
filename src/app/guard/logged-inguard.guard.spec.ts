import { TestBed } from '@angular/core/testing';

import { LoggedInguardGuard } from './logged-inguard.guard';

describe('LoggedInguardGuard', () => {
  let guard: LoggedInguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedInguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
