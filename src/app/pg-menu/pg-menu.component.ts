import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, EntrepriseStorageService, LinksService, Links } from '../services';
import { User, Role, Entreprise } from '../models';

@Component({
  selector: 'pg-menu',
  templateUrl: './pg-menu.component.html',
  styleUrls: ['./pg-menu.component.css']
})
export class PgMenuComponent implements OnInit {

  public currentUser: User;
  public currentEntreprise: Entreprise;
  public routes: Links;

  constructor(private authenticationService: AuthenticationService,
              private entrepriseStorageService: EntrepriseStorageService,
              private linksService: LinksService,
              private router: Router) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
    this.entrepriseStorageService.entreprise.subscribe(x => {
      this.currentEntreprise = x;
    });
    this.linksService.currentLinks.subscribe(x => {
        this.routes = x;
    });
  }

  get user() {
    return this.currentUser;
  }

  get entreprise() {
    return this.currentEntreprise;
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
    this.router.navigate(this.routes.login);
  }

  close() {
    this.entrepriseStorageService.close();
    this.router.navigate(['/']);
  }

}
