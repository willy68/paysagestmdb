import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services';
import { User } from '../models';

@Component({
  selector: 'pg-menu',
  templateUrl: './pg-menu.component.html',
  styleUrls: ['./pg-menu.component.css']
})
export class PgMenuComponent implements OnInit {

  currentUser: User;
  isCollapsed = true;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }

}
