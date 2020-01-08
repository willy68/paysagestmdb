import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService, EntrepriseStorageService, LinksService, Links } from '../services';
import { User, Role, Entreprise } from '../models';

@Component({
  selector: 'pg-menu',
  templateUrl: './pg-menu.component.html',
  styleUrls: ['./pg-menu.component.css']
})
export class PgMenuComponent implements OnInit, OnDestroy {

  private unsubscribAuthService: Subject<any> = new Subject<any>();
  private unsubscribEntrStorageService: Subject<any> = new Subject<any>();
  private unsubscribLinksService: Subject<any> = new Subject<any>();

  public currentUser: User;
  public currentEntreprise: Entreprise;
  public routes: Links;

  constructor(private authenticationService: AuthenticationService,
              private entrepriseStorageService: EntrepriseStorageService,
              private linksService: LinksService,
              private router: Router) {
  }

  get user() {
    return this.currentUser;
  }

  get entreprise() {
    return this.currentEntreprise;
  }

  ngOnInit() {
    this.authenticationService.currentUser
    .pipe(takeUntil(this.unsubscribAuthService))
    .subscribe(x => {
      this.currentUser = x;
    });
    this.entrepriseStorageService.entreprise
    .pipe(takeUntil(this.unsubscribEntrStorageService))
    .subscribe(x => {
      this.currentEntreprise = x;
    });
    this.linksService.currentLinks
    .pipe(takeUntil(this.unsubscribLinksService))
    .subscribe(x => {
        this.routes = x;
    });
  }

  ngOnDestroy() {
    this.unsubscribAuthService.next();
    this.unsubscribAuthService.complete();
    this.unsubscribEntrStorageService.next();
    this.unsubscribEntrStorageService.complete();
    this.unsubscribLinksService.next();
    this.unsubscribLinksService.complete();
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
    this.router.navigate(this.routes.open);
  }

}
