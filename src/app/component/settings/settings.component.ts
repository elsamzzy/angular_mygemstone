import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../service/dashboard.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  session: any;
  user: any;
  plan: any;
  refDetails: any;

  bankSuccess = '';
  passwordSuccess = '';

  bankError = '';
  bankNameError = '';
  bankAccountNameError = '';
  bankAccountNumberError = '';
  bankPasswordError = '';

  passwordError = '';
  oldPasswordError = '';
  newPasswordError = '';

  BankForm = this.formBuilder.group({
    bank_name: '',
    bank_account_name: '',
    bank_account_number: '',
    bank_password: ''
  });

  PasswordForm = this.formBuilder.group({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  constructor(
      private dashboardService: DashboardService,
      private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.session = sessionStorage.getItem('logged') || localStorage.getItem('logged');
    this.getUserInfo();
    this.getPlan();
    this.getReferralDetails();
    this.BankForm = new FormGroup({
      bank_name: new FormControl (this.BankForm.value.bank_name, [
          Validators.required
      ]),
      bank_account_name: new FormControl ( this.BankForm.value.bank_account_name, [
          Validators.required
      ]),
      bank_account_number: new FormControl ( this.BankForm.value.bank_account_number, [
          Validators.required
      ]),
      bank_password: new FormControl ( this.BankForm.value.bank_password, [
          Validators.required
      ])
    });

    this.PasswordForm = new FormGroup({
      old_password: new FormControl (this.PasswordForm.value.old_password, [
          Validators.required
      ]),
      password: new FormControl ( this.PasswordForm.value.password, [
          Validators.required,
          Validators.minLength(6),
      ]),
      password_confirmation: new FormControl ( this.PasswordForm.value.password_confirmation, [
          Validators.required,
          Validators.minLength(6)
      ]),
    });
  }

  get bank() {
    return this.BankForm.controls;
  }

  get password(){
    return this.PasswordForm.controls;
  }

  getUserInfo(): any {
    this.dashboardService.getInfo(this.session)
        .subscribe(response => {
          this.user = response;
        });
  }

  getReferralDetails() {
    this.dashboardService.getReferralDetails(this.session)
        .subscribe(details => {
          return this.refDetails = Object.keys(details).length;
        });
  }

  getPlan(): any{
    this.dashboardService.getCouponAmount(this.session)
        .subscribe(response => {
            return this.plan = response;
        });
  }

  changeBank() {
      this.bankError = '';
      this.bankPasswordError = '';
      this.bankNameError = '';
      this.bankAccountNumberError = '';
      this.bankAccountNameError = '';

      if (
          this.bank.bank_name.value === '' ||
          this.bank.bank_account_number.value === '' ||
          this.bank.bank_account_name.value === '' ||
          this.bank.bank_password.value === ''
      ) {
          return this.bankError = 'Please fill all the forms';
      }

      return this.dashboardService.changeBank(this.session, this.BankForm.value)
          .subscribe(response => {
              if (response) {
                  return this.bankSuccess = 'Successfully changed your bank details';
              }
              return this.bankError = 'Incorrect Password';
          });
  }

  changePassword() {
      this.passwordError = '';
      this.oldPasswordError = '';
      this.newPasswordError = '';

      if (
          this.password.old_password.value === '' ||
          this.password.password.value === '' ||
          this.password.password_confirmation.value === ''
      ) {
          return this.passwordError = 'Please fill all the forms';
      }

      return this.dashboardService.changePassword(this.session, this.PasswordForm.value)
          .subscribe(response => {
              if (response) {
                  return this.passwordSuccess = 'Successfully changed your password';
              } else if (response === 1) {
                  return this.oldPasswordError = 'Incorrect Password';
              } else if (response === 2) {
                  return this.newPasswordError = 'Passwords does not match';
              } else if (response ===3) {
                  return this.newPasswordError = 'Passwords must be at least 6 characters long';
              }
              return this.passwordError = 'Could not change your password at this time';
          });
  }

}
