import { NgModule } from '@angular/core';
import {CanActivate, RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './component/home/home.component';
import {AboutComponent} from './component/about/about.component';
import {BankDetailsComponent} from './component/bank-details/bank-details.component';
import {CouponComponent} from './component/coupon/coupon.component';
import {RegpathComponent} from './component/regpath/regpath.component';
import {AuthService} from './guard/auth.service';
import {CanDeactivateGuard} from './guard/can-deactivate.guard';
import {CanCouponGuard} from './guard/can-coupon.guard';
import {SuccessComponent} from './component/success/success.component';
import {SuccessGuardGuard} from './guard/success-guard.guard';
import {PasswordComponent} from './component/password/password.component';
import {PasswordGuard} from './guard/password.guard';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {LoggedInguardGuard} from './guard/logged-inguard.guard';
import {SettingsComponent} from './component/settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register',
    component: RegpathComponent,
    children : [
      {
        path: '',
        component: RegisterComponent
      },
      {
        path: '',
        children: [
          {
            path: 'password',
            canActivate: [PasswordGuard],
            canDeactivate: [ CanDeactivateGuard ],
            component: PasswordComponent
          },
          { path: 'bank',
            component: BankDetailsComponent,
            canActivate: [ AuthService ],
            canDeactivate: [ CanDeactivateGuard ]
          },
          {
            path: 'coupon',
            component: CouponComponent,
            canActivate: [ CanCouponGuard ],
            canDeactivate: [ CanDeactivateGuard ]
          },
          {
            path: 'success',
            component: SuccessComponent,
            canActivate: [ SuccessGuardGuard ],
            canDeactivate: [ CanDeactivateGuard ]
          }
        ]
      },
    ]
  },
    {
        path: '',
        canActivateChild: [ LoggedInguardGuard ],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            }
        ]
    },
  { path: 'about', component: AboutComponent },
  { path: '*', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
