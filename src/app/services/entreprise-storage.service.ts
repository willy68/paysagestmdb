import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EntrepriseService } from './entreprise.service';
import { AuthenticationService } from './authentication.service';
import { Entreprise } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseStorageService {
  currentEntrepriseSubject: BehaviorSubject<Entreprise>;
  entreprise: Observable<Entreprise>;

  constructor(private entrepriseService: EntrepriseService,
    private authenticationService: AuthenticationService) {
    this.currentEntrepriseSubject = new BehaviorSubject<Entreprise>(JSON.parse(localStorage.getItem('currentEntreprise')));
    this.entreprise = this.currentEntrepriseSubject.asObservable();
  }

  public get currentEntrepriseValue(): Entreprise {
    return this.currentEntrepriseSubject.value;
  }

  public update(entreprise: Entreprise) {
    localStorage.setItem('currentEntreprise', JSON.stringify(entreprise));
    this.currentEntrepriseSubject.next(entreprise);
  }

  public open(id: number, params?: '') {
    const user = this.authenticationService.currentUserValue;
    if (user) {
      return this.entrepriseService.get(user.id, id, params).pipe(
        tap(entreprise => {
          if (entreprise) {
            this.update(entreprise);
          }
          return entreprise;
        })
      );
    }
  }

  public close() {
    localStorage.removeItem('currentEntreprise');
    this.currentEntrepriseSubject.next(null);
  }

}
