import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Client, DernierCode, Civilite } from '../../../models';
import { Observable, BehaviorSubject, Subject, NEVER } from 'rxjs';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CiviliteService } from 'src/app/services';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { YesnomodalComponent } from 'src/app/yesnomodal/yesnomodal.component';

@Component({
  selector: 'pg-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ClientFormComponent implements OnInit, OnChanges {

  @Input() client: Client;
  public form: FormGroup;
  public entreprise_id: number;
  public dernier_code: string;
  public last_code: Observable<DernierCode>;
  private readonly refreshCiviliteList = new BehaviorSubject(null);
  public civiliteList: Observable<Civilite[]>;
  public civilites: Civilite[];
  private deadModal = new Subject();
  public modalRef: MDBModalRef;

  constructor(
    private ctrlContainer: FormGroupDirective,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private civiliteService: CiviliteService,
    private modalService: MDBModalService) { }


  ngOnChanges(changes: SimpleChanges): void {
      if (this.client && this.form) {
        (<FormGroup>this.form.controls['clientForm']).patchValue(this.client);
      }
  }

  ngOnInit() {
    this.form = this.ctrlContainer.form;

    this.form.addControl('clientForm',
      this.formBuilder.group({
        'code_client': [{disabled: true}, [Validators.required]],
        'civilite': ['', []],
        'nom': ['', [Validators.required]],
        'prenom': ['', []],
        'tel': ['', []],
        'portable': ['', []],
        'email': ['', [Validators.required, Validators.email]],
        'tva_intracom': ['', []],
      }));

      if (this.client) {
        (<FormGroup>this.form.controls['clientForm']).patchValue(this.client);
      }

      /*this.last_code = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          this.entreprise_id = +params.get('entreprise_id');
          return this.dernierCodeService.getLastCode(this.entreprise_id, 'client').pipe(
            tap(data => {
              this.dernier_code = data.prochain_code;
              (<FormGroup>this.form.controls['clientForm']).patchValue({ code_client: this.dernier_code });
            })
          );
        })
      );*/
    this.civiliteList = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        return this.refreshCiviliteList.pipe(
          switchMap(() => this.civiliteService.getList(this.entreprise_id).pipe(
            tap(data => this.civilites = data)
          ))
        );
      })
    );

    console.log(this.form);
  }

  get f() { return (<FormGroup>this.form.controls['clientForm']).controls; }

  isInvalid(controlName: string): boolean {

    return (<FormGroup>this.form.controls['clientForm']).controls[controlName].touched
      && (<FormGroup>this.form.controls['clientForm']).controls[controlName].invalid;
  }

  isValid(controlName: string): boolean {
    return (<FormGroup>this.form.controls['clientForm']).controls[controlName].touched
      && (<FormGroup>this.form.controls['clientForm']).controls[controlName].valid;
  }

  civiliteFocusout(event) {
    if (this.f.civilite.value.length &&
      !this.civilites.find(element => element.libelle === this.f.civilite.value)) {
      this.modalRef = this.openModal();
      this.modalRef.content.action.pipe(
        switchMap((result: any) => {
          this.modalRef.hide();
          if (result) {
            return this.civiliteService.create(this.entreprise_id,
              {
                entreprise_id: this.entreprise_id,
                libelle: this.f.civilite.value
              });
          } else {
            return NEVER;
          }
        }),
        takeUntil(this.deadModal))
        .subscribe(() => this.refreshCiviliteList.next(null));
    }
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
          description: 'Voulez sauvegarder la civilité ' + this.f.civilite.value
        },
        button: {
          yes: 'Sauver!',
          no: 'Fermer'
        }
      }
    });
  }
}
