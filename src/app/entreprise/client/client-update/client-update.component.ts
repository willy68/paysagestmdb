import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first, takeUntil, switchMap, tap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClientService, AlertService, DernierCodeService } from 'src/app/services';
import { Subject, Observable } from 'rxjs';
import { Client, DernierCode } from 'src/app/models';

@Component({
  selector: 'pg-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {

  public submitted = false;
  public loading = false;
  public clientForm: FormGroup;
  public client_code: Observable<DernierCode>;
  private dernier_code: string;
  private deadCreate = new Subject();
  private entreprise_id: number;
  private id: number;
  private client: Client;
  private updatedClient: Observable<Client>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private dernierCodeService: DernierCodeService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.clientForm = new FormGroup({});

    console.log(this.clientForm);

    this.updatedClient = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        this.id = +params.get('id');
        return this.clientService.get(this.entreprise_id, this.id).pipe(
          tap((client: Client) => {
            this.client = client;
            this.clientForm.patchValue(client);
          })
        );
      })
    );
    this.client_code = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        return this.dernierCodeService.getLastCode(this.entreprise_id, 'client').pipe(
          tap(data => {
            this.dernier_code = data.prochain_code;
            // this.clientForm.patchValue({ code_client: this.dernier_code });
          })
        );
      })
    );
  }

  // convenience getter for easy access to form fields
  // get f() { return (<FormGroup>this.clientForm.controls['clientForm']); }
  /*
  get code_client() { return this.clientForm.get('code_client'); }
  get civilite() { return this.clientForm.get('civilite'); }
  get nom() { return this.clientForm.get('nom'); }
  get prenom() { return this.clientForm.get('prenom'); }
  get tel() { return this.clientForm.get('tel'); }
  get portable() { return this.clientForm.get('portable'); }
  get email() { return this.clientForm.get('email'); }
  get tva_intracom() { return this.clientForm.get('tva_intracom'); }
*/
  onSubmit() {
    this.submitted = true;

    console.log(this.clientForm.value);
    // stop here if form is invalid or entreprise_id is null
    if (this.clientForm.invalid || !this.entreprise_id) {
      return;
    }
/*
    this.loading = true;
    this.clientService.update(this.entreprise_id, {
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
    this.loading = false;*/
  }

}
