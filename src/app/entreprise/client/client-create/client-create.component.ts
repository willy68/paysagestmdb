import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClientService, AlertService } from 'src/app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pg-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  public entreprise_id: number;
  public createForm: FormGroup;
  public submitted = false;
  public loading = false;

  public imagePath: FileList;
  public imgURL: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.createFormBuild();
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.entreprise_id = +params.get('entreprise_id');
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  createFormBuild() {
    this.createForm = this.fb.group({
      code_client: ['', [Validators.required]],
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
  get tel() { return this.createForm.get('tel'); }
  get portable() { return this.createForm.get('portable'); }
  get email() { return this.createForm.get('email'); }
  get tva_intracom() { return this.createForm.get('tva_intracom'); }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid or currentUser is null
    if (this.createForm.invalid || this.entreprise_id) {
      return;
    }

    this.loading = true;
    this.clientService.create(this.entreprise_id, {
      code_client: this.f.siret.value,
      civilite: this.f.nom.value,
      nom: this.f.ape.value,
      prenom: this.f.tva_intracom.value,
      tel: this.f.adresse.value,
      portable: this.f.suite_adresse.value,
      email: this.f.cp.value,
      tva_intracom: this.f.ville.value
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
    this.imgURL = '';
    this.createForm.reset();
    Object.keys(this.createForm.controls).forEach(key => {
      this.createForm.controls[key].setErrors(null);
    });
  }

}
