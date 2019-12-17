import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { EntrepriseService, EntrepriseStorageService } from '../services';
import { AuthenticationService } from '../services';
import { Entreprise } from '../models';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'pg-entreprises-list',
  templateUrl: './entreprises-list.component.html',
  styleUrls: ['./entreprises-list.component.scss']
})
export class EntreprisesListComponent implements OnInit {
  public entrepriseList: Observable<Entreprise[]>;
  public selectedItem = -1;
  public emptyList = false;

  constructor(private entrepriseService: EntrepriseService,
    private entrepriseStorageService: EntrepriseStorageService,
    private authenticationService: AuthenticationService) {}

  open(id: number) {
    this.entrepriseStorageService.open(id)
    .pipe(first())
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
      this.entrepriseList = this.entrepriseService.getList(user.id);
      //.pipe(first())
      //.subscribe(
        //list => {
          //this.entrepriseList = from(list);
        //},
        //error => {
         //console.log(error);
        //}
      //);
    }
  }

}
