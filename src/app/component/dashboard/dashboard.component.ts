import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../service/dashboard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user!: [];
  info!: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.info = sessionStorage.getItem('logged') || localStorage.getItem('logged');
    this.getUserInfo();
  }

  getUserInfo(){
    this.dashboardService.getInfo(this.info)
        .subscribe(response => {
          console.log(response);
          this.user = response;
        });
}

}
