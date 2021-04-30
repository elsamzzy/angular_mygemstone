import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogService} from '../../service/dialog.service';
import {UserServiceService} from '../../service/user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  errorPassword = '';
  errorPasswordconfirm = '';
  error = '';
  user = sessionStorage.getItem('user');

  passwordForm = this.formBuilder.group({
    password: '',
    confirm_password: ''
  });

  constructor(
      private formBuilder: FormBuilder,
      private dialogService: DialogService,
      private userservice: UserServiceService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      password: new FormControl ( this.passwordForm.value.password, [
          Validators.required,
          Validators.minLength(6)
      ]),
      confirm_password: new FormControl ( this.passwordForm.value.confirm_password, [
          Validators.required,
          Validators.minLength(6),
      ])
    });
  }

  get password() {
    return this.passwordForm.controls;
  }

  onSubmit() {
    this.errorPassword = '';
    this.errorPasswordconfirm = '';

    const pass = this.password.password.value;
    const con_pass = this.password.confirm_password.value;

    if (pass.length < 6) {
      return this.errorPassword = 'Password must be more than 6 characters long';
    }

    if (this.confirmPassword(pass, con_pass)) {
     return this.userservice.password(this.passwordForm.value, this.user)
         .subscribe(response => {
           if (response) {
             const set = sessionStorage.getItem('user') || 'Null';
             sessionStorage.setItem('bank', set);
             sessionStorage.removeItem('user');
             return this.router.navigate(['/register/bank']);
           }
           return this.error = 'There was an error authenticating your credentials';
         });
    }
    return this.errorPasswordconfirm = 'Password does not match';
  }

  confirmPassword(pass: string, conpass: string): boolean{
    if (pass !== conpass){
      return false;
    }
    return true;
  }

  // run the can deactivate method
  canDeactivate(): Observable<boolean> | boolean {
    if (this.passwordForm.value.password.length ! > 2 || this.passwordForm.value.confirm_password.length ! > 3) {
      return true;
    }
    return this.dialogService.confirm('Are you sure you want to leave?. It is advised to complete your password');
  }

}
