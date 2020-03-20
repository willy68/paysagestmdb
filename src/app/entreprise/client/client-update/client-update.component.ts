import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClientService, AlertService } from 'src/app/services';
import { Client } from 'src/app/models';
import { Observable, Subject } from 'rxjs';
import { switchMap, shareReplay, first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pg-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit, OnDestroy {

  public clientForm: FormGroup;
  public client: Client;
  public client$: Observable<Client>;
  public id: number;
  public entreprise_id: number;
  private deadCreate = new Subject();
  public loading = false;
  public submitted = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.clientForm = new FormGroup({});

    this.client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        this.id = +params.get('id');
        return this.clientService.get(this.entreprise_id, this.id, '?include=adresses');
      }),
      shareReplay(1)
    );
  }

  get f () { return (<FormGroup>this.clientForm.controls['clientForm']).controls; }

  get fb (): FormGroup { return (<FormGroup>this.clientForm.controls['clientForm']); }

  onSubmit() {
    // console.log(this.clientForm.value);
    // console.log(this.clientForm.value.clientForm);
    // this.client = this.clientForm.value.clientForm;
    // console.log(this.f.code_client.value);
    this.submitted = true;

    // stop here if form is invalid or entreprise_id is null
    if (this.clientForm.invalid || !this.entreprise_id) {
      return;
    }

    this.loading = true;
    this.clientService.update(this.entreprise_id, {
      id: this.id,
      code_client: this.f.code_client.value,
      civilite: this.f.civilite.value,
      nom: this.f.nom.value,
      prenom: this.f.prenom.value,
      tel: this.f.tel.value,
      portable: this.f.portable.value,
      email: this.f.email.value,
      tva_intracom: this.f.tva_intracom.value
    })
      .pipe(first(),
      takeUntil(this.deadCreate))
      .subscribe(
        data => {
          this.alertService.success('SUCCESS!! : ' + data.nom);
          // navigue vers clients list
          this.router.navigate(['../../'], {relativeTo: this.route});
        },
        error => {
          this.alertService.error(error);
        });
    this.loading = false;
  }

  ngOnDestroy() {
    this.deadCreate.next();
    this.deadCreate.complete();
  }
}
