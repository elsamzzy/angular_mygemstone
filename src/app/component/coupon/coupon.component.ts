import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserServiceService } from '../../service/user-service.service';
import { Router } from '@angular/router';
import { DialogService } from '../../service/dialog.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  error = '';
  id = sessionStorage.getItem('bdet');

  couponForm = this.formBuilder.group({
    coupon: '',
  });

  constructor(
      private formBuilder: FormBuilder,
      private userservice: UserServiceService,
      private router: Router,
      private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.couponForm = new FormGroup({
      coupon: new FormControl ( this.couponForm.value.coupon, [
          Validators.required,
      ])
    });
  }

  get coupon() {
    return this.couponForm.controls;
  }

  onSubmit() {
    this.error = '';
    const coup = this.couponForm.value.coupon.toString().trim();
    const coupp = this.couponForm.value;
    if (coup === '') {
      return this.error = 'Please input a valid coupon';
    }
    return this.userservice.verifyCoupon(coupp, this.id)
        .subscribe(response => {
          console.log(response);
          if (response === 0){
            return this.error = 'There was an error authenticating your credentials 2';
          } else if (response === 1) {
            return this.error = 'Input a valid code';
          } else if (typeof response === 'number') {
            return this.userservice.updateCoupon(coupp, this.id)
                .subscribe(res => {
                  if (res === 'fail') {
                    return this.error = 'There was a major error authenticating your credentials';
                  }
                  return console.log(res);

                  // sessionStorage.setItem('suc', 'yes');
                  // sessionStorage.removeItem('bdet');
                  // return this.router.navigate(['/register/success']);
                });
          } else {
            return this.error = 'There was an error processing your coupon';
          }

        });

  }

  // run the can deactivate method
  canDeactivate(): Observable<boolean> | boolean {
    if (this.couponForm.value.coupon.toString().length ! > 1) {
      return true;
    }
    return this.dialogService.confirm('Are you sure you want to leave?. You can continue by login in');
  }

}
