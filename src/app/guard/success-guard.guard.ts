import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessGuardGuard implements CanActivate {
  canSuccess(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true|UrlTree{
    const url: string = state.url;
    if (sessionStorage.getItem('suc')) {
      return true;
    }
    return this.router.parseUrl('/register/coupon');
  }

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canSuccess(route, state);
  }
  
}
