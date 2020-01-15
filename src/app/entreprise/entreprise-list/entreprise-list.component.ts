import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, NEVER } from 'rxjs';

import { EntrepriseService, EntrepriseStorageService } from '../../services';
import { AuthenticationService } from '../../services';
import { Entreprise, User } from '../../models';
import { switchMap, take, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'pg-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.scss']
})
export class EntrepriseListComponent implements OnInit, OnDestroy {
  public entrepriseList: Observable<Entreprise[]>;
  public selectedItem = -1;
  public emptyList = false;

  constructor(private entrepriseService: EntrepriseService,
    private entrepriseStorageService: EntrepriseStorageService,
    private authenticationService: AuthenticationService,
    private router: Router) {}

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
        take(1),
        switchMap(list => {
            if (list.length > index) {
              return this.entrepriseStorageService.open(user.id, list[index].id);
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
    const user = this.authenticationService.currentUserValue;
    if (user) {
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
    this.entrepriseList = this.authenticationService.currentUser
    .pipe(
      switchMap((user) => this.entrepriseService.getList(user.id).pipe(
        tap(list => console.log(list)),
        catchError(() => {
          this.emptyList = true;
          return [];
        })
      ))
    );
  }

  ngOnDestroy() {
  }

}
