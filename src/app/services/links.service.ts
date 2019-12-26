import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { EntrepriseStorageService } from './entreprise-storage.service';

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
        home:  ['/'],
        register: ['/register'],
        login: ['/login'],
        entreprise: ['/entreprise'],
        new_entreprise: ['/entreprise/entreprise-create'],
        edit_entreprise: ['/entreprise/entreprise-edit'],
        open: ['/entreprise/entreprise-list'],
        clients: ['/clients']
      });
      this.currentLinks = this.currentLinksSubject.asObservable();
      this.authenticationService.currentUser.subscribe(x => {
        const routes = this.currentLinksSubject.value;
        if (x) {
          routes.new_entreprise = ['/entreprise/entreprise-create', {user_id: x.id}];
          routes.open = ['/entreprise/entreprise-list', {user_id: x.id}];
        } else {
          routes.new_entreprise = ['/entreprise/entreprise-create'];
          routes.open = ['/entreprise/entreprise-list'];
        }
        this.currentLinksSubject.next(routes);
      });
      this.entrepriseStorageService.entreprise.subscribe(x => {
        const routes = this.currentLinksSubject.value;
        if (x) {
          routes.entreprise = ['/entreprise', x.id];
          routes.edit_entreprise = ['entreprise/entreprise-edit', x.id];
          routes.clients = ['/entreprise', x.id, 'clients'];
          routes.register = ['/register', {entreprise_id: x.id}];
          routes.login = ['/login', {entreprise_id: x.id}];
        } else {
          routes.entreprise = ['/entreprise'];
          routes.clients = ['/entreprise'];
          routes.register = ['/register'];
          routes.login = ['/login'];
        }
      });
    }
}
