import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClientService, DernierCodeService, CiviliteService, AlertService } from 'src/app/services';
import { first } from 'rxjs/operators';
import { Civilite } from 'src/app/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'pg-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  public entreprise_id: number;
  public dernier_code: string;
  public civiliteList: Observable<Civilite[]>;
  public createForm: FormGroup;
  public submitted = false;
  public loading = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private dernierCodeService: DernierCodeService,
    private civiliteService: CiviliteService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.createFormBuild();
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
        this.dernierCodeService.getLastCode(this.entreprise_id, 'client')
          .subscribe(data => {
            this.dernier_code = data.prochain_code;
            this.createForm.patchValue({ code_client: this.dernier_code });
          });
        this.civiliteList = this.civiliteService.getList(this.entreprise_id);
      });
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
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('SUCCESS!! : ' + data.nom);
          // navigue vers clients list pour ouvrir cette entreprise
          this.router.navigate(['../']);
        },
        error => {
          this.alertService.error(error);
        });
    this.loading = false;
  }

  resetForm() {
    this.submitted = false;
    this.createForm.reset({
      code_client: { value: this.dernier_code, disabled: true }
    });
    /*Object.keys(this.createForm.controls).forEach(key => {
      this.createForm.controls[key].setErrors(null);
    });
    this.createForm.patchValue({code_client: this.dernier_code});*/
  }

}
