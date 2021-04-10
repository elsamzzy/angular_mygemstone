import { TestBed } from '@angular/core/testing';

import { CanCouponGuard } from './can-coupon.guard';

describe('CanCouponGuard', () => {
  let guard: CanCouponGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanCouponGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
