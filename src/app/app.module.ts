import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './component/about/about.component';
import { HomeComponent } from './component/home/home.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { BankDetailsComponent } from './component/bank-details/bank-details.component';
import { CouponComponent } from './component/coupon/coupon.component';
import { RegpathComponent } from './component/regpath/regpath.component';
import { RegChilPathComponent } from './component/reg-chil-path/reg-chil-path.component';
import { SuccessComponent } from './component/success/success.component';
import { PasswordComponent } from './component/password/password.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    HomeComponent,
    BankDetailsComponent,
    CouponComponent,
    RegpathComponent,
    RegChilPathComponent,
    SuccessComponent,
    PasswordComponent,
    DashboardComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
