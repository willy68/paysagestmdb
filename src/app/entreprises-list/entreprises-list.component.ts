import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { EntrepriseService, EntrepriseStorageService } from '../services';
import { AuthenticationService } from '../services';
import { Entreprise } from '../models';

@Component({
  selector: 'pg-entreprises-list',
  templateUrl: './entreprises-list.component.html',
  styleUrls: ['./entreprises-list.component.scss']
})
export class EntreprisesListComponent implements OnInit {
  private currentEntrepriseSubject: BehaviorSubject<Entreprise[]>;
  public entrepriseList: Observable<Entreprise[]>;
  public selectedItem = -1;
  public emptyList = false;

  constructor(private entrepriseService: EntrepriseService,
    private entrepriseStorageService: EntrepriseStorageService,
    private authenticationService: AuthenticationService) {
      this.currentEntrepriseSubject = new BehaviorSubject<Entreprise[]>([]);
      this.entrepriseList = this.currentEntrepriseSubject.asObservable();
  }

  public get currentUserValue(): Entreprise[] {
    return this.currentEntrepriseSubject.value;
  }

  open(id: number) {
    this.entrepriseStorageService.open(id)
    .pipe()
    .subscribe(
      data => {

      },
      error => {

      });
  }

  onSelect(index: number) {
    this.selectedItem = index;
}


  ngOnInit() {
    let user = this.authenticationService.currentUserValue;
    if (user) {
      this.entrepriseService.getList(user.id)
      .pipe()
      .subscribe(
        list => {
          this.currentEntrepriseSubject.next(list);
        },
        error => {
         console.log(error);
        }
      );
    }
  }

}
