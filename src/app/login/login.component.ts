import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DashboardService} from '../service/dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = '';

  loginForm = this.formBuilder.group({
    username: '',
    password: '',
    remember: true,
  });

  constructor(
      private formBuilder: FormBuilder,
      private dashboard: DashboardService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl ( this.loginForm.value.username, [
          Validators.required
      ]),
      password: new FormControl ( this.loginForm.value.password, [
          Validators.required
      ]),
      remember: new FormControl ( this.loginForm.value.password, [
         Validators.required
      ]),
    });
  }

  get login() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.error = '';
    this.dashboard.login(this.loginForm.value)
        .subscribe(response => {
            if (response !== false) {
            if (this.loginForm.value.remember) {
              localStorage.setItem('logged', response);
              return this.router.navigate(['/dashboard']);
            }
            sessionStorage.setItem('logged', response);
            return this.router.navigate(['/dashboard']);
          }
            return this.error = 'Invalid Login Details';
        });
  }

}
