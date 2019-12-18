import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, EntrepriseStorageService } from '../services';
import { User, Role, Entreprise } from '../models';

@Component({
  selector: 'pg-menu',
  templateUrl: './pg-menu.component.html',
  styleUrls: ['./pg-menu.component.css']
})
export class PgMenuComponent implements OnInit {

  public currentUser: User;
  public currentEntreprise: Entreprise;
  public isCollapsed = true;

  constructor(private authenticationService: AuthenticationService,
              private entrepriseStorageService: EntrepriseStorageService,
              private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.entrepriseStorageService.entreprise.subscribe(x => this.currentEntreprise = x);
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

  close() {
    this.entrepriseStorageService.close();
    this.router.navigate(['/']);
  }

}
