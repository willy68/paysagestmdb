import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientService, DernierCodeService, CiviliteService } from 'src/app/services';

import { Client } from 'src/app/models';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
    private clientService: ClientService) { }

  ngOnInit() {
    this.clientForm = new FormGroup({});

    this.client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        this.id = +params.get('id');
        return this.clientService.get(this.entreprise_id, this.id);
      })
    );
    // console.log((<FormGroup>this.clientForm.controls['addressForm']));
    // this.f.firstName.patchValue('CL1');
  }

  get f () { return (<FormGroup>this.clientForm.controls['addressForm']).controls; }

  onSubmit() {
    console.log(this.clientForm.value);
  }

  resetForm() {
    this.submitted = false;
    this.clientForm.reset(/*{
      code_client: { value: this.dernier_code, disabled: true }
    }*/);
  }
}
