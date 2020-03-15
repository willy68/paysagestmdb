import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Client, DernierCode, Civilite } from 'src/app/models';
import { Observable, BehaviorSubject, Subject, NEVER } from 'rxjs';
import { DernierCodeService, CiviliteService } from 'src/app/services';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { YesnomodalComponent } from 'src/app/yesnomodal/yesnomodal.component';

@Component({
  selector: 'pg-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ClientFormComponent implements OnInit, OnDestroy {
  @Input() client: Client;
  public entreprise_id: number;
  form: FormGroup;
  public dernier_code: string;
  public last_code: Observable<DernierCode>;
  private readonly refreshCiviliteList = new BehaviorSubject(null);
  public civiliteList: Observable<Civilite[]>;
  public civilites: Civilite[];
  private deadModal = new Subject();
  public createForm: FormGroup;
  public submitted = false;
  public loading = false;
  public modalRef: MDBModalRef;

  constructor(
    private ctrlContainer: FormGroupDirective,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dernierCodeService: DernierCodeService,
    private civiliteService: CiviliteService,
    private modalService: MDBModalService) { }

    ngOnInit() {
      this.form = this.ctrlContainer.form;

      this.form.addControl('addressForm',
        this.createForm = this.fb.group({
          code_client: [{ value: this.dernier_code, disabled: true }, [Validators.required]],
          civilite: ['', []],
          nom: ['', [Validators.required]],
          prenom: ['', []],
          tel: ['', []],
          portable: ['', []],
          email: ['', [Validators.required, Validators.email]],
          tva_intracom: ['', []]
        }));
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
      }

      get code_client() { return this.createForm.get('code_client'); }
      get civilite() { return this.createForm.get('civilite'); }
      get nom() { return this.createForm.get('nom'); }
      get prenom() { return this.createForm.get('prenom'); }
      get tel() { return this.createForm.get('tel'); }
      get portable() { return this.createForm.get('portable'); }
      get email() { return this.createForm.get('email'); }
      get tva_intracom() { return this.createForm.get('tva_intracom'); }

      isInvalid(controlName: string): boolean {
        return (<FormGroup>this.form.controls['addressForm']).controls[controlName].touched
          && (<FormGroup>this.form.controls['addressForm']).controls[controlName].invalid;
      }

      isValid(controlName: string): boolean {
        return (<FormGroup>this.form.controls['addressForm']).controls[controlName].touched
          && (<FormGroup>this.form.controls['addressForm']).controls[controlName].valid;
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
        this.deadModal.next();
        this.deadModal.complete();
      }

}
