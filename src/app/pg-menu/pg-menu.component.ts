import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, EntrepriseStorageService } from '../services';
import { User, Role, Entreprise } from '../models';

class Links {
  home: [any, any];
  register: [any, any];
  login: [any, any];
  entreprise: [any, any];
  new_entreprise: [any, any];
  open: [any, any];
  clients: [any, any];
}

@Component({
  selector: 'pg-menu',
  templateUrl: './pg-menu.component.html',
  styleUrls: ['./pg-menu.component.css']
})
export class PgMenuComponent implements OnInit {

  public currentUser: User;
  public currentEntreprise: Entreprise;
  public routes: Links;

  private std_routes: Links = {
    home:  ['/', {}],
    register: ['/register', {}],
    login: ['/login', {}],
    entreprise: ['/entreprise', {}],
    new_entreprise: ['/new_entreprise', {}],
    open: ['/entreprise/entreprise-list', {}],
    clients: ['/clients', {}]
  };

  constructor(private authenticationService: AuthenticationService,
              private entrepriseStorageService: EntrepriseStorageService,
              private router: Router) {
    this.routes = Object.assign({}, this.std_routes);
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x;
      if (x) {
        this.routes.new_entreprise = ['/new_entreprise', {user_id: x.id}];
        this.routes.open = ['/entreprise/entreprise-list', {user_id: x.id}];
      } else {
        this.routes.new_entreprise = ['/new_entreprise', {}];
        this.routes.open = ['/entreprise/entreprise-list', {}];
      }
    });
    this.entrepriseStorageService.entreprise.subscribe(x => {
      this.currentEntreprise = x;
      if (x) {
        this.routes.entreprise = ['/entreprise', x.id];
        this.routes.register = ['/register', {entreprise_id: x.id}];
        this.routes.login = ['/login', {entreprise_id: x.id}];
      } else {
        this.routes.entreprise = ['/entreprise', {}];
        this.routes.register = ['/register', {}];
        this.routes.login = ['/login', {}];
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
    this.router.navigate(this.routes.login);
  }

  close() {
    this.entrepriseStorageService.close();
    this.router.navigate(['/']);
  }

}
