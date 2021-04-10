import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';
import {User} from '../modules/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorRefid = '';
  errorUsername = '';
  errorEmail = '';
  errorName = '';
  errorMob = '';
  error: any = '';
  message = '';
  registerForm = this.formBuilder.group({
    refid: 'Admin',
    name: '',
    username: '',
    email: '',
      mob: ''
  });

  constructor(
      private formBuilder: FormBuilder,
      private userservice: UserServiceService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      refid: new FormControl ( this.registerForm.value.refid, [
         Validators.required,
         Validators.minLength(3),
         Validators.maxLength(8),
      ]),
      name: new FormControl( this.registerForm.value.name, [
          Validators.required,
          Validators.minLength(4),
      ]),
      email: new FormControl (this.registerForm.value.email, [
          Validators.required,
          Validators.email,
      ]),
      username: new FormControl ( this.registerForm.value.username, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(8),
      ]),
        mob: new FormControl ( this.registerForm.value.mob, [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(11)
      ])
    });
  }

  get f() {
      return this.registerForm.controls;
  }


  /*
  onSubmit() {
    const referral = this.registerForm.value.refid;
    const name = this.registerForm.value.name.trim();
    if (!name) {
      // return this.error = 'Invalid Information';
    }

    this.userservice.searchUsers(referral)
        .subscribe( refs => {
         for (let refer of refs){
           this.ref = refer.username;
         }
         if (referral !== this.ref){
           return this.error = 'Referral does not exist';
         }
         return this.userservice.registerUser(this.registerForm.value).subscribe(
            reply => {
              return this.message = `Successfully added a user ${reply}`;
            }
         );
        });
    console.log(this.message);
    // this.registerForm.reset();
  }
  */

  public onSubmit(): any {
      this.errorRefid = '';
      this.errorUsername = '';
      this.errorEmail = '';
      this.errorName = '';
      this.errorMob = '';

    const referral = this.registerForm.value.refid.trim();
    const email = this.registerForm.value.email.trim();
    const name = this.registerForm.value.name.trim();
    const username = this.registerForm.value.username.trim();
    const mob = this.registerForm.value.mob.toString().trim();

    if (this.checkingInput(referral, email, name, username, mob) !== 'good') {
        return this.error = 'Please Fill the appropriate field with the right details';
    } else {
        return this.userservice.checkUser(referral)
            .subscribe(refs => {
                if ( refs !== null) {
                    if (referral !== refs.username) {
                        return this.errorRefid = 'Referral is invalid';
                    } else {
                        // const mail$ = this.verifyEmail(email);
                        return this.userservice.verifyEmail(email)
                            .subscribe(userdet => {
                                if (userdet === 1) {
                                    return this.errorEmail = 'Email has already been used';
                                } else if ( userdet === 0 ) {
                                    return this.userservice.verifyUsername(username)
                                        .subscribe(userdets => {
                                            if (userdets === 1) {
                                                return this.errorUsername = 'Username has already been used';
                                            } else {
                                                return this.userservice.verifyPhone(mob)
                                                    .subscribe(res => {
                                                        if (res === 1) {
                                                            return this.error = 'Phone Number has been used';
                                                        } else {
                                                            return this.userservice.registerUser(this.registerForm.value).subscribe(
                                                                reply => {
                                                                    const save = reply.toString();
                                                                    sessionStorage.setItem('user', save);
                                                                    this.router.navigate(['/register/bank']);
                                                                }
                                                            );
                                                        }
                                                    });
                                            }
                                        });
                                } else {
                                    return this.error = 'There was an issue verifying details';
                                }
                            });
                    }
                } else {
                    return this.errorRefid = 'Referral does not exist';
                }
            });
    }
  }

  /*
  verifyReferral(refer: string) {
    this.userservice.checkUser(refer)
        .subscribe(refs => {
          this.ref$ = refs.username;
        });
  }


  verifyEmail(email: string): Observable<number>{
     this.userservice.verifyEmail(email)
        .subscribe( userdet => userdet);
  }

  verifyUsername(username: string): any{

  }
   */
  private checkingInput(ref: any, em: any, nam: any, user: any, mobi: any): any{
      if (typeof ref !== 'string'){
          return this.errorRefid = 'Please input a valid Referral Name';
      } else {
          if (this.verifyValidRef(ref) === ''){
              return this.errorRefid = 'Please input a valid Referral Name';
          } else {
              if (typeof em !== 'string'){
                  return this.errorEmail = 'Please input a valid Email Address';
              } else {
                  if (this.verifyValidEmail(em) === '') {
                      return this.errorEmail = 'Please input a valid Email Address';
                  } else {
                      if (typeof nam !== 'string') {
                          return this.errorName = 'Please input a valid Name';
                      } else {
                          if (this.verifyValidName(nam) === '') {
                              return this.errorName = 'Please input a valid Name';
                          } else {
                              if (typeof user !== 'string') {
                                  return this.errorUsername = 'Please input a valid Username';
                              } else {
                                  if (this.verifyValidUsername(user) === '') {
                                      return this.errorUsername = 'Please input a valid Username';
                                  } else {
                                      if (typeof mobi !== 'string') {
                                          return this.errorMob = 'Please input a valid Phone Number';
                                      } else {
                                          if (this.verifyValidNumber(mobi) === 0) {
                                              return this.errorMob = 'Please input a valid Phone Number';
                                          } else {
                                              return 'good';
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
  }

  private verifyValidRef(referral: string): string {
      if (this.f.refid.errors || referral.length === 0) {
          return '';
      } else {
          return referral;
      }
  }

  private verifyValidName(name: string): string {
      if (this.f.name.errors || name.length === 0) {
          return '';
      } else {
          return name;
      }
  }

    private verifyValidUsername(username: string): string {
        if (this.f.username.errors || username.length === 0) {
            return '';
        } else {
            return username;
        }
    }

    private verifyValidNumber(phone: any): number {
        if (this.f.mob.errors || phone.length === 0 || phone.length < 9 || phone.length > 11 ) {
            return 0;
        } else {
            return phone;
        }
    }

    private verifyValidEmail(email: string): string{
        if (this.f.email.errors || email.length === 0) {
            return '';
        } else {
            return email;
        }
    }

}
