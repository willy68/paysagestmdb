import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Client } from '../../../models';

@Component({
  selector: 'pg-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ClientFormComponent implements OnInit {

  @Input() client: Client;
  public form: FormGroup;
  // private readonly refreshCiviliteList = new BehaviorSubject(null);
  // public civiliteList: Observable<Civilite[]>;
  // public civilites: Civilite[];
  // public entreprise_id: number;
  // private deadModal = new Subject();
  // public modalRef: MDBModalRef;

  constructor(
    private ctrlContainer: FormGroupDirective,
    private formBuilder: FormBuilder,
    /*private route: ActivatedRoute,
    private civiliteService: CiviliteService,
    private modalService: MDBModalService*/) { }

  ngOnInit() {
    this.form = this.ctrlContainer.form;

    this.form.addControl('clientForm',
      this.formBuilder.group({
        'code_client': [null, [Validators.required]],
        'lastName': [null, [Validators.required]],
        'phone': [null, null],
        'street': [null, [Validators.required]],
        'city': [null, [Validators.required]],
        'state': [null],
        'zip': [null, [Validators.required]],
      }));

    /*this.civiliteList = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        return this.refreshCiviliteList.pipe(
          switchMap(() => this.civiliteService.getList(this.entreprise_id).pipe(
            tap(data => this.civilites = data)
          ))
        );
      })
    );*/

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

  /*civiliteFocusout(event) {
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
  }*/
}
