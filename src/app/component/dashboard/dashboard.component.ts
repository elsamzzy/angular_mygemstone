import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../service/dashboard.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  ref: any;
  info: any;
  numUser!: number;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.info = sessionStorage.getItem('logged') || localStorage.getItem('logged');
    this.getReferralDetails();
    this.user = this.getUserInfo();
  }

  getUserInfo(){
    this.dashboardService.getInfo(this.info)
        .subscribe(response => {
          this.user = response;
        });
}

    getReferralDetails() {
      this.dashboardService.getReferralDetails(this.info)
          .subscribe(details => {
              this.ref = details;
              this.numUser = Object.keys(details).length;
          });
    }

    countObject(object: any): number {
      return object.length;
    }

    countInsideRef(array: any): number {
      let total = 0;
      Array(this.generateArray(array)).forEach(arr => {
          total = total + this.countObject(arr);
      });
      return total;
    }

    generateArray(obj: any){
        return Object.keys(obj).map((key) => { return obj[key]});
    }

}
