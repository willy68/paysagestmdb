import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '../services';
import { User, Role } from '../models';

@Component({
  selector: 'pg-menu',
  templateUrl: './pg-menu.component.html',
  styleUrls: ['./pg-menu.component.css']
})
export class PgMenuComponent implements OnInit {

  currentUser: User;
  isCollapsed = true;

  constructor(private authenticationService: AuthenticationService) {
  }

   @Input()
    set user(current: User) {
      this.currentUser = current;
    }

    get user() {
      return this.currentUser;
    }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }

}
