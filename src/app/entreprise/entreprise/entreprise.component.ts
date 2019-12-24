import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, ParamMap } from '@angular/router';

import { EntrepriseStorageService } from '../../services';

@Component({
  selector: 'pg-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {
  public entreprise_id = -1;

  constructor( private entrepriseStorageService: EntrepriseStorageService) {
    this.entrepriseStorageService.entreprise.subscribe(x => {
      if (x) {
        this.entreprise_id = x.id;
      }
    });
  }

  ngOnInit() {
  }

}
