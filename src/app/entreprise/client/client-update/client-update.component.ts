import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientService, DernierCodeService } from 'src/app/services';

import { Client } from 'src/app/models';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'pg-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {

  public clientForm: FormGroup;
  public client: Client;
  public client$: Observable<Client>;
  public id: number;
  public entreprise_id: number;
  public loading = false;
  public submitted = false;
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private dernierCodeService: DernierCodeService) { }

  ngOnInit() {
    this.clientForm = new FormGroup({});

    this.client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        this.id = +params.get('id');
        return this.clientService.get(this.entreprise_id, this.id);
      }),
      shareReplay(1)
    );

    /*this.client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        return this.dernierCodeService.getLastCode(this.entreprise_id, 'client').pipe(
          switchMap( (value) => {
            this.client = {} as Client;
            this.client.code_client = value.prochain_code;
            return of<Client>(this.client);
          })
        );
      })
    );*/
  }

  get f () { return (<FormGroup>this.clientForm.controls['clientForm']).controls; }

  get fb (): FormGroup { return (<FormGroup>this.clientForm.controls['clientForm']); }

  onSubmit() {
    // console.log(this.clientForm.value);
    console.log(this.clientForm.value.clientForm);
    this.client = this.clientForm.value.clientForm;
    console.log(this.f.code_client.value);
  }

}
