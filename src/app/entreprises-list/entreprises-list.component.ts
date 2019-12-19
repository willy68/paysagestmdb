import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { EntrepriseService, EntrepriseStorageService } from '../services';
import { AuthenticationService } from '../services';
import { Entreprise } from '../models';

@Component({
  selector: 'pg-entreprises-list',
  templateUrl: './entreprises-list.component.html',
  styleUrls: ['./entreprises-list.component.scss']
})
export class EntreprisesListComponent implements OnInit {
  private currentEntreprisesSubject: BehaviorSubject<Entreprise[]>;
  public entrepriseList: Observable<Entreprise[]>;
  public selectedItem = -1;
  public emptyList = false;

  constructor(private entrepriseService: EntrepriseService,
    private entrepriseStorageService: EntrepriseStorageService,
    private authenticationService: AuthenticationService) {
      this.currentEntreprisesSubject = new BehaviorSubject<Entreprise[]>([]);
      this.entrepriseList = this.currentEntreprisesSubject.asObservable();
  }

  public get currentEntreprisesValue(): Entreprise[] {
    return this.currentEntreprisesSubject.value;
  }

  public open(user_id: number, id: number) {
    this.entrepriseStorageService.open(user_id, id)
    .subscribe( entreprise => {
      return entreprise;
    });
  }

  public onOpen(index: number) {
    let user = this.authenticationService.currentUserValue;
    if (user) {
      this.selectedItem = index;
      let list = this.currentEntreprisesValue;
      if (list.length > index) {
        this.open(user.id, list[index].id);
      }
    }
  }

  onSelect(index: number) {
    this.selectedItem = index;
  }

  ngOnInit() {
    let user = this.authenticationService.currentUserValue;
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

}
