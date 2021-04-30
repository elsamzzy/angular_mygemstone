import { Injectable } from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DashboardService} from '../service/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInguardGuard implements CanActivateChild {

  constructor(private router: Router, private dashboard: DashboardService) {}

  IsLogIn(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true|UrlTree{
    const url: string = state.url;
    if (sessionStorage.getItem('logged') || localStorage.getItem('logged')) {
        const user = sessionStorage.getItem('logged') || localStorage.getItem('logged');
        if (this.dashboard.checkUser(user)) { return true; }
        return this.router.parseUrl('/login');
    }
    return this.router.parseUrl('/login');
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.IsLogIn(childRoute, state);
  }
  
}
