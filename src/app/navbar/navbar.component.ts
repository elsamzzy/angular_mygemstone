import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../service/dashboard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sessions: any;
  user: any;

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.sessions = sessionStorage.getItem('logged') || localStorage.getItem('logged');
    if (sessionStorage.getItem('logged') || localStorage.getItem('logged')) {
      this.getName();
    }
  }

  getName() {
    this.dashboardService.getInfo(this.sessions)
        .subscribe(response => {
          this.user = response;
        });
  }

  logout(): any{
    sessionStorage.clear();
    localStorage.clear();
    return this.router.navigate(['/login']);
  }

}
