import { Component, OnInit } from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faLifeRing } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faPiggyBank = faPiggyBank;
  faRocket = faRocket;
  faFileAlt = faFileAlt;
  faHandsHelping = faHandsHelping;
  faLock = faLock;
  faLifeRing = faLifeRing;

  constructor() { }

  ngOnInit(): void {
  }

}
