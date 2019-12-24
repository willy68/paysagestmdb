import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, ParamMap } from '@angular/router';

import { EntrepriseStorageService, AuthenticationService } from '../../services';

@Component({
  selector: 'pg-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {
  public entreprise_id: number = null;
  public user_id: number = null;

  constructor( private entrepriseStorageService: EntrepriseStorageService,
    private authenticationService: AuthenticationService) {
    this.entrepriseStorageService.entreprise.subscribe(x => {
      if (x) {
        this.entreprise_id = x.id;
      } else {
        this.entreprise_id = null;
      }
    });
    this.authenticationService.currentUser.subscribe(x => {
      if (x) {
        this.user_id = x.id;
      } else {
        this.user_id = null;
      }
    });
  }

  ngOnInit() {
  }

}
