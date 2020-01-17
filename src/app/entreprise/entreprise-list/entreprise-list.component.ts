import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, EMPTY, Subject } from 'rxjs';
import { switchMap, take, catchError, shareReplay, takeUntil } from 'rxjs/operators';

import { EntrepriseService, EntrepriseStorageService, AlertService } from '../../services';
import { AuthenticationService } from '../../services';
import { Entreprise, User } from '../../models';

@Component({
  selector: 'pg-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.scss']
})
export class EntrepriseListComponent implements OnInit, OnDestroy {
  private unsubscribList: Subject<any>;
  public entrepriseList: Observable<Entreprise[]>;
  public selectedItem = -1;
  public emptyList = false;

  constructor(private entrepriseService: EntrepriseService,
    private entrepriseStorageService: EntrepriseStorageService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router) {
    this.unsubscribList = new Subject<any>();
  }

  get user(): User {
    return this.authenticationService.currentUserValue;
  }
  public onOpen(index: number) {
    if (index === -1) { return; }
    const user = this.authenticationService.currentUserValue;
    if (user) {
      this.selectedItem = index;
      this.entrepriseList
        .pipe(
          takeUntil(this.unsubscribList),
          take(1),
          switchMap(list => {
            if (list.length > index) {
              return this.entrepriseStorageService.open(user.id, list[index].id).pipe(
                catchError(error => {
                  let errorMessage = 'Impossible d\'ouvrir cette entreprise';
                  if ( typeof error === 'string' ) {
                    errorMessage = error;
                  }
                  this.alertService.error(errorMessage);
                  return EMPTY;
                })
              );
            } else {
              return EMPTY;
            }
          })
        )
        .subscribe(entreprise => {
          this.router.navigate(['entreprise', entreprise.id]);
        });
    }
  }

  onSelect(index: number) {
    this.selectedItem = index;
  }

  onEdit(index: number) {
    if (index === -1) { return; }
    const user = this.authenticationService.currentUserValue;
    if (user) {
      this.selectedItem = index;
      this.entrepriseList.pipe(
        takeUntil(this.unsubscribList)
      )
        .subscribe(list => {
          if (list.length > index) {
            this.router.navigate(['entreprise/entreprise-edit', list[index].id]);
          }
        });
    }
  }

  ngOnInit() {
    /*const user = this.authenticationService.currentUserValue;
    if (user) {
      this.entrepriseList = this.entrepriseListBehavior
        .pipe(
          switchMap(() => this.entrepriseService.getList(user.id).pipe(
            tap(list => console.log(list)),
            catchError(() => {
              this.emptyList = true;
              return [];
            })
          ))
        );
    } else {
      this.emptyList = true;
    }*/
    this.entrepriseList = this.authenticationService.currentUser.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return this.entrepriseService.getList(user.id).pipe(
            catchError(() => {
              this.emptyList = true;
              return of<Entreprise[]>([]);
            })
          );
        } else {
          this.emptyList = true;
          return of<Entreprise[]>([]);
        }
      })
    ).pipe(shareReplay(1));
  }

  ngOnDestroy() {
    this.unsubscribList.next();
    this.unsubscribList.complete();
  }

}
