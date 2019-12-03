import { Component, OnInit } from '@angular/core';
// import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { AuthenticationService } from '../services';
import { User } from '../services';

@Component({
  selector: 'pg-menu',
  templateUrl: './pg-menu.component.html',
  styleUrls: ['./pg-menu.component.css']
})
export class PgMenuComponent implements OnInit {

  currentUser: User;
  // faSignOutAlt = faSignOutAlt;
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
