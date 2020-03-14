import { Component, OnInit } from '@angular/core';
import { ClientService, AdresseService, AlertService } from 'src/app/services';
import { first, tap, takeUntil, switchMap, catchError, map, take } from 'rxjs/operators';
import { Civilite, Client, Adresse } from 'src/app/models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subject, Observable, of } from 'rxjs';

@Component({
  selector: 'pg-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  private unsubscribList: Subject<any>;
  public clientList: Observable<Client[]>;
  public adresseList: Observable<Adresse[]>;
  private entreprise_id: number;
  public selectedItem = -1;
  public emptyList = false;
  public errorViewMessage = 'Aucune entreprise trouvée,' +
    'Si vous n\'en avez peut-être pas encore créé une,' +
    'cliquez sur le bouton: Nouvelle entreprise.' +
    'Sinon un problème est peut-être survenu,' +
    'veuillez retenter plus tard.';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private adresseService: AdresseService,
    private modalService: MDBModalService,
    private alertService: AlertService) {
    this.unsubscribList = new Subject<any>();
  }

  ngOnInit() {
    this.clientList = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        return this.clientService.getList(this.entreprise_id, '?include=adresses').pipe(
          tap(clientList => clientList),
          catchError(() =>  {
            this.emptyList = true;
            return of<Client[]>([]);
          })
        );
      })
    );
  }

  onSelect(index: number) {
    this.selectedItem = index;
  }

}
