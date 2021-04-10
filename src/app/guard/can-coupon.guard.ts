import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanCouponGuard implements CanActivate {

  constructor(private router: Router) {}

  canCoupon(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true|UrlTree{
    const url: string = state.url;
    if (sessionStorage.getItem('bdet')) {
      return true;
    }
    return this.router.parseUrl('/register/bank');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canCoupon(route, state);
  }
}
