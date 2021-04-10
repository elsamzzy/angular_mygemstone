import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { BankDetailsComponent } from '../component/bank-details/bank-details.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

// Next method is for component specific can Deactivate guard

/*
@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<BankDetailsComponent> {
  CanDeactivate(
      component: BankDetailsComponent,
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log(route.paramMap.get('id'));

    //Get the current URL
    console.log(state.url);

    return component.canDeactivate();
  }
}
 */
