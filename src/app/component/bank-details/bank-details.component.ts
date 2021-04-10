import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserServiceService } from '../../service/user-service.service';
import {Bank} from '../../modules/user';
import { DialogService } from '../../service/dialog.service';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import {isArray} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  errorBank= '';
  errorName = '';
  errorNumber = '';
  error = '';
  user: any = sessionStorage.getItem('user');

  bankForm = this.formBuilder.group({
    bank: '',
    name: '',
    number: '',
  });

  constructor(
      private formBuilder: FormBuilder,
      private userservice: UserServiceService,
      public dialogService: DialogService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.bankForm = new FormGroup({
      bank: new FormControl ( this.bankForm.value.bank, [
          Validators.required
      ]),
      name: new FormControl ( this.bankForm.value.name, [
          Validators.required,
          Validators.minLength(4)
      ]),
      number: new FormControl (this.bankForm.value.number,[
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12)
      ])
    });
  }

  get bank() {
    return this.bankForm.controls;
  }

  onSubmit() {
    this.error = '';
    this.errorNumber = '';
    const num = this.bankForm.value.number.toString();
    if (num.lenght < 10 || num.length > 12) {
      return this.errorNumber = 'Input a valid Account Number';
    } else {
      return this.userservice.updateBankDetails(this.bankForm.value, this.user)
          .subscribe(det => {
            if (!isArray(det)) {
              console.log('Failed');
              console.log(det);
              return this.error = 'There was an error authenticating your credentials';
            } else {
              const save = det.toString();
              sessionStorage.setItem('bdet', save);
              sessionStorage.removeItem('user');
              return this.router.navigate(['/register/coupon']);
            }
      });
    }
  }

  // run the can deactivate method
  canDeactivate(): Observable<boolean> | boolean {
    if (this.bankForm.value.bank.length ! > 2 || this.bankForm.value.name.length ! > 3 || this.bankForm.value.number.toString().length ! > 9 ) {
      return true;
    }
    return this.dialogService.confirm('Are you sure you want to leave?. It is advised to complete your bank details which you can change in settings');
  }


}
