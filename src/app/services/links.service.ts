import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, merge } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { EntrepriseStorageService } from './entreprise-storage.service';
import { switchMap, map } from 'rxjs/operators';

export type link = Array<any>;

export interface Links {
  home: link;
  register: link;
  login: link;
  entreprise: link;
  new_entreprise: link;
  edit_entreprise: link;
  open: link;
  clients: link;
  [key: string]: link;
}

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private currentLinksSubject: BehaviorSubject<Links>;
  public currentLinks: Observable<Links>;

  constructor(private authenticationService: AuthenticationService,
    private entrepriseStorageService: EntrepriseStorageService) {
    this.currentLinksSubject = new BehaviorSubject<Links>({
      home: ['/'],
      register: ['/register'],
      login: ['/login'],
      entreprise: ['/entreprise'],
      new_entreprise: ['/entreprise/entreprise-create'],
      edit_entreprise: ['/entreprise/entreprise-edit'],
      open: ['/entreprise/entreprise-list'],
      clients: ['/clients']
    });
    this.currentLinks = merge(this.authenticationService.currentUser.pipe(
      switchMap((user) => {
        return this.currentLinksSubject.pipe(
          map((routes) => {
            if (user) {
              routes.new_entreprise = ['/entreprise/entreprise-create', { user_id: user.id }];
              routes.open = ['/entreprise/entreprise-list', { user_id: user.id }];
            } else {
              routes.new_entreprise = ['/entreprise/entreprise-create'];
              routes.open = ['/entreprise/entreprise-list'];
            }
            return routes;
          })
        );
      })
    ),
      this.entrepriseStorageService.entreprise.pipe(
        switchMap((entreprise) => {
          return this.currentLinksSubject.pipe(
            map((routes) => {
              if (entreprise) {
                routes.entreprise = ['/entreprise', entreprise.id];
                routes.edit_entreprise = ['entreprise/entreprise-edit', entreprise.id];
                routes.clients = ['/entreprise', entreprise.id, 'clients'];
                routes.register = ['/register', { entreprise_id: entreprise.id }];
                routes.login = ['/login', { entreprise_id: entreprise.id }];
              } else {
                routes.entreprise = ['/entreprise'];
                routes.register = ['/register'];
                routes.login = ['/login'];
              }
              return routes;
            })
          );
        })
      )
    );
  }
}
