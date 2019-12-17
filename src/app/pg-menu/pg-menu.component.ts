import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
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

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
