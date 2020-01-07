import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe, never, NEVER } from 'rxjs';

import { EntrepriseService, EntrepriseStorageService } from '../../services';
import { AuthenticationService } from '../../services';
import { Entreprise, User } from '../../models';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'pg-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.scss']
})
export class EntrepriseListComponent implements OnInit, OnDestroy {
  private currentEntreprisesSubject: BehaviorSubject<Entreprise[]>;
  public entrepriseList: Observable<Entreprise[]>;
  public user: User;
  public selectedItem = -1;
  public emptyList = false;

  constructor(private entrepriseService: EntrepriseService,
    private entrepriseStorageService: EntrepriseStorageService,
    private authenticationService: AuthenticationService,
    private router: Router) {
      this.currentEntreprisesSubject = new BehaviorSubject<Entreprise[]>([]);
      this.entrepriseList = this.currentEntreprisesSubject.asObservable();
  }

  public get currentEntreprisesValue(): Entreprise[] {
    return this.currentEntreprisesSubject.value;
  }

  public open(user_id: number, id: number) {
    this.entrepriseStorageService.open(user_id, id)
    .subscribe( entreprise => {
      this.router.navigate(['entreprise', entreprise.id]);
    });
  }

  public onOpen(index: number) {
    if (index === -1) { return; }
    // const user = this.authenticationService.currentUserValue;
    if (this.user) {
      this.selectedItem = index;
      this.entrepriseList
      .pipe(
        take(1),
        switchMap(list => {
            if (list.length > index) {
              return this.entrepriseStorageService.open(this.user.id, list[index].id);
            } else {
              return NEVER;
            }
        })
      )
      .subscribe( entreprise => {
        this.router.navigate(['entreprise', entreprise.id]);
      });
    }
  }

  onSelect(index: number) {
    this.selectedItem = index;
  }

  onEdit(index: number) {
    if (index === -1) { return; }
    // const user = this.authenticationService.currentUserValue;
    if (this.user) {
      this.selectedItem = index;
      this.entrepriseList
      .subscribe( list => {
        if (list.length > index) {
          this.router.navigate(['entreprise/entreprise-edit', list[index].id]);
        }
      });
    }
  }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    if (this.user) {
      this.entrepriseList = this.currentEntreprisesSubject
      .pipe(
        switchMap(() => this.entrepriseService.getList(this.user.id))
      );
    }
  }

  ngOnDestroy() {
    this.currentEntreprisesSubject.next(null);
    this.currentEntreprisesSubject.complete();
  }

}
