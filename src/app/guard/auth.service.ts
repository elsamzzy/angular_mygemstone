import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  UrlTree
} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private router: Router) {}

  canAccess(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true|UrlTree{
    const url: string = state.url;
    if (sessionStorage.getItem('bank')) {
      return true;
    }
    return this.router.parseUrl('/register/password');
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true|UrlTree {
    return this.canAccess(route, state);
  }
}
