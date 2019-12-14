import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { first } from 'rxjs/operators';

import { EntrepriseService, AlertService } from '../services';
import { Entreprise } from '../models';
import { AuthenticationService } from '../services';
import { User, Role } from '../models';

@Component({
  selector: 'pg-entreprise-create',
  templateUrl: './pg-entreprise-create.component.html',
  styleUrls: ['./pg-entreprise-create.component.scss']
})
export class PgEntrepriseCreateComponent implements OnInit {
  currentUser: User;
  public createForm: FormGroup;
  public submitted = false;
  public loading = false;

  public imagePath: FileList;
  public imgURL: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private entrepriseService: EntrepriseService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
     }

  ngOnInit() {
    this.createFormBuild();
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  createFormBuild() {
    this.createForm = this.fb.group({
    siret: ['', [Validators.required]],
    nom: ['', [Validators.required]],
    ape: ['', [Validators.required]],
    tva_intracom: ['', [Validators.required]],
    adresse: ['', [Validators.required]],
    suite_adresse: ['', []],
    cp: ['', [Validators.required]],
    ville: ['', [Validators.required]],
    tel: ['', []],
    portable: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]] ,
    regime_commercial: ['', []],
    logo: ['', []]
    });
  }

  get siret() { return this.createForm.get('siret'); }
  get nom() { return this.createForm.get('nom'); }
  get ape() { return this.createForm.get('ape'); }
  get tva_intracom() { return this.createForm.get('tva_intracom'); }
  get adresse() { return this.createForm.get('adresse'); }
  get suite_adresse() { return this.createForm.get('suite_adresse'); }
  get cp() { return this.createForm.get('cp'); }
  get ville() { return this.createForm.get('ville'); }
  get tel() { return this.createForm.get('tel'); }
  get portable() { return this.createForm.get('portable'); }
  get email() { return this.createForm.get('email'); }
  get regime_commercial() { return this.createForm.get('regime_commercial'); }
  get logo() { return this.createForm.get('logo'); }

  previewLogo(files: FileList) {
    if (files.length === 0) { return; }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.alertService.error('Seul les fichiers image sont supportés');
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createForm.invalid) {
        return;
    }

    this.loading = true;
    this.entrepriseService.create(this.currentUser.id, {
      siret: this.f.siret.value,
      nom: this.f.nom.value,
      ape: this.f.ape.value,
      tva_intracom: this.f.tva_intracom.value,
      adresse: this.f.adresse.value,
      suite_adresse: this.f.suite_adresse.value,
      cp: this.f.cp.value,
      ville: this.f.ville.value,
      tel: this.f.tel.value,
      portable: this.f.portable.value,
      email: this.f.email.value,
      regime_commercial: this.f.regime_commercial.value,
      logo: this.imgURL ? this.imgURL : '' } )
    .pipe(first())
    .subscribe(
        data => {
            // this.router.navigate([this.returnUrl]);
            this.alertService.success('SUCCESS!! : ' + data.nom );
           // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data));
            this.router.navigate(['/home']);
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
