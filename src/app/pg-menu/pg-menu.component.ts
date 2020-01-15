import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, shareReplay } from 'rxjs/operators';

import { AuthenticationService, EntrepriseStorageService, LinksService, Links } from '../services';
import { User, Role, Entreprise } from '../models';

@Component({
  selector: 'pg-menu',
  templateUrl: './pg-menu.component.html',
  styleUrls: ['./pg-menu.component.css']
})
export class PgMenuComponent implements OnInit, OnDestroy {

  private unsubscribLinksService: Subject<any> = new Subject<any>();

  public currentUser: Observable<User>;
  public currentEntreprise: Observable<Entreprise>;
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
    this.currentUser = this.authenticationService.currentUser.pipe(
      shareReplay(1)
    );
    this.currentEntreprise = this.entrepriseStorageService.entreprise.pipe(
      shareReplay(1)
    );
    this.linksService.currentLinks
    .pipe(takeUntil(this.unsubscribLinksService))
    .subscribe(x => {
        this.routes = x;
    });
  }

  ngOnDestroy() {
    this.unsubscribLinksService.next();
    this.unsubscribLinksService.complete();
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  get isAdmin() {
    return this.authenticationService.currentUserValue &&
      this.authenticationService.currentUserValue.role === Role.Admin;
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
