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
  public routes: {
    home: string, 
    register: string, 
    login: string, 
    new_entreprise: string, 
    open: string, 
    clients: string
  }; 

  public std_routes = {
    home: '/',
    register: '/register',
    login: '/login',
    new_entreprise: '/new_entreprise',
    open: '/open_entreprise',
    clients: '/clients'
  };

  constructor(private authenticationService: AuthenticationService,
              private entrepriseStorageService: EntrepriseStorageService,
              private router: Router) {
                this.routes = Object.assign({}, this.std_routes);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.entrepriseStorageService.entreprise.subscribe(x => {
      this.currentEntreprise = x;
      if (x) {
        this.routes.register = `/entreprise/${x.id}/register`;
        this.routes.login = `/entreprise/${x.id}/login`;
      } else {
        Object.assign(this.routes, this.std_routes);
      }
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
    this.router.navigate([this.routes.home]);
  }

  close() {
    this.entrepriseStorageService.close();
    this.router.navigate(['/']);
  }

}
