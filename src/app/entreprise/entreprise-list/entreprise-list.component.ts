import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { EntrepriseService, EntrepriseStorageService } from '../../services';
import { AuthenticationService } from '../../services';
import { Entreprise } from '../../models';

@Component({
  selector: 'pg-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.scss']
})
export class EntrepriseListComponent implements OnInit, OnDestroy {
  private currentEntreprisesSubject: BehaviorSubject<Entreprise[]>;
  public entrepriseList: Observable<Entreprise[]>;
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
    const user = this.authenticationService.currentUserValue;
    if (user) {
      this.selectedItem = index;
      const list = this.currentEntreprisesValue;
      if (list.length > index && index !== -1) {
        this.open(user.id, list[index].id);
      }
    }
  }

  onSelect(index: number) {
    this.selectedItem = index;
  }

  onEdit(index: number) {
    const user = this.authenticationService.currentUserValue;
    if (user) {
      this.selectedItem = index;
      const list = this.currentEntreprisesValue;
      if (list.length > index && index !== -1) {
        this.router.navigate(['entreprise/entreprise-edit', list[index].id]);
      }
    }

  }

  ngOnInit() {
    const user = this.authenticationService.currentUserValue;
    if (user) {
      this.entrepriseService.getList(user.id)
      .subscribe(
        list => {
          this.currentEntreprisesSubject.next(list);
        },
        error => {
         console.log(error);
        }
      );
    }
  }

  ngOnDestroy() {
    this.currentEntreprisesSubject.next(null);
    this.currentEntreprisesSubject.complete();
  }

}
