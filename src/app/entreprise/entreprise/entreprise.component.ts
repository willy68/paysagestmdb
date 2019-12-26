import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EntrepriseStorageService, AuthenticationService } from '../../services';

@Component({
  selector: 'pg-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit, OnDestroy {
  public entreprise_id: number = null;
  public user_id: number = null;
  private unsubscribAuthService: Subject<any> = new Subject<any>();
  private unsubscribEntrStorageService: Subject<any> = new Subject<any>();

  constructor( private entrepriseStorageService: EntrepriseStorageService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.entrepriseStorageService.entreprise
    .pipe(takeUntil(this.unsubscribEntrStorageService))
    .subscribe(x => {
      if (x) {
        this.entreprise_id = x.id;
      } else {
        this.entreprise_id = null;
      }
    });
    this.authenticationService.currentUser
    .pipe(takeUntil(this.unsubscribAuthService))
    .subscribe(x => {
      if (x) {
        this.user_id = x.id;
      } else {
        this.user_id = null;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribAuthService.next();
    this.unsubscribAuthService.complete();
    this.unsubscribEntrStorageService.next();
    this.unsubscribEntrStorageService.complete();
  }
}
