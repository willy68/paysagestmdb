import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClientService, DernierCodeService, CiviliteService, AlertService } from 'src/app/services';
import { first, tap, takeUntil, switchMap } from 'rxjs/operators';
import { Civilite, DernierCode } from 'src/app/models';
import { Observable, Subject, BehaviorSubject, NEVER } from 'rxjs';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { YesnomodalComponent } from 'src/app/yesnomodal/yesnomodal.component';

@Component({
  selector: 'pg-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit, OnDestroy {

  public entreprise_id: number;
  public dernier_code: string;
  public last_code: Observable<DernierCode>;
  private readonly refreshCiviliteList = new BehaviorSubject(null);
  public civiliteList: Observable<Civilite[]>;
  public civilites: Civilite[];
  private deadCreate = new Subject();
  private deadModal = new Subject();
  public createForm: FormGroup;
  public submitted = false;
  public loading = false;
  public modalRef: MDBModalRef;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private dernierCodeService: DernierCodeService,
    private civiliteService: CiviliteService,
    private modalService: MDBModalService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.createFormBuild();
    this.last_code = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        return this.dernierCodeService.getLastCode(this.entreprise_id, 'client').pipe(
          tap(data => {
            this.dernier_code = data.prochain_code;
            this.createForm.patchValue({ code_client: this.dernier_code });
          })
        );
      })
    );
    this.civiliteList = this.refreshCiviliteList.pipe(
      switchMap(() => this.civiliteService.getList(this.entreprise_id).pipe(
        tap(data => this.civilites = data)
      ))
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

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  createFormBuild() {
    this.createForm = this.fb.group({
      code_client: [{ value: this.dernier_code, disabled: true }, [Validators.required]],
      civilite: ['', []],
      nom: ['', [Validators.required]],
      prenom: ['', []],
      tel: ['', []],
      portable: ['', []],
      email: ['', [Validators.required, Validators.email]],
      tva_intracom: ['', []]
    });
  }

  get code_client() { return this.createForm.get('code_client'); }
  get civilite() { return this.createForm.get('civilite'); }
  get nom() { return this.createForm.get('nom'); }
  get prenom() { return this.createForm.get('prenom'); }
  get tel() { return this.createForm.get('tel'); }
  get portable() { return this.createForm.get('portable'); }
  get email() { return this.createForm.get('email'); }
  get tva_intracom() { return this.createForm.get('tva_intracom'); }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid or entreprise_id is null
    if (this.createForm.invalid || !this.entreprise_id) {
      return;
    }

    this.loading = true;
    this.clientService.create(this.entreprise_id, {
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
          this.router.navigate(['../', data.id, 'adresse-create', {client: data.nom}], {relativeTo: this.route});
        },
        error => {
          this.alertService.error(error);
        });
    this.loading = false;
  }

  civiliteFocusout(event) {
    if (this.civilite.value.length &&
      !this.civilites.find(element => element.libelle === this.civilite.value)) {
      this.modalRef = this.openModal();
      this.modalRef.content.action.pipe(
        switchMap( (result: any) => {
          this.modalRef.hide();
          if (result) {
            return this.civiliteService.create(this.entreprise_id,
              {
                entreprise_id: this.entreprise_id,
                libelle: this.civilite.value
              });
          } else {
            return NEVER;
          }
      }),
      takeUntil(this.deadModal))
      .subscribe(() => this.refreshCiviliteList.next(null));
    }
  }

  resetForm() {
    this.submitted = false;
    this.createForm.reset({
      code_client: { value: this.dernier_code, disabled: true }
    });
  }

  openModal(): MDBModalRef {
    return this.modalRef = this.modalService.show(YesnomodalComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: '',
        containerClass: '',
        animated: true,
        data: {
          heading: 'Sauvegarde',
          content: {
            heading: 'Civilité nouvelle',
            description: 'Voulez sauvegarder la civilité ' + this.civilite.value
          },
          button: {
            yes: 'Sauver!',
            no: 'Fermer'
          }
        }
    });
  }

  ngOnDestroy() {
    this.deadCreate.next();
    this.deadCreate.complete();
    this.deadModal.next();
    this.deadModal.complete();
  }
}
