import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordGuard implements CanActivate {
  constructor(private router: Router) {}

  canAccess(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true|UrlTree{
    const url: string = state.url;
    if (sessionStorage.getItem('user')) {
      return true;
    }
    return this.router.parseUrl('/register');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
