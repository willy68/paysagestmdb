import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models';
import { Router } from '@angular/router';
import { ClientService, AuthenticationService, AlertService } from 'src/app/services';
import { first } from 'rxjs/operators';

/*
    'entreprise_id',
    'code_client',
    'civilite',
    'nom',
    'prenom',
    'tel',
    'portable',
    'email',
    'tva_intracom'
*/

@Component({
  selector: 'pg-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  currentUser: User;
  public createForm: FormGroup;
  public submitted = false;
  public loading = false;

  public imagePath: FileList;
  public imgURL: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
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
    code_client: ['', [Validators.required]],
    civilite: ['', []],
    nom: ['', [Validators.required]],
    prenom: ['', []],
    tel: ['', []],
    portable: ['', []],
    email: ['', [Validators.required, Validators.email]] ,
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

    // stop here if form is invalid or currentUser is null
    if (this.createForm.invalid || this.currentUser) {
        return;
    }

    this.loading = true;
    this.clientService.create(this.currentUser.id, {
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
            this.alertService.success('SUCCESS!! : ' + data.nom );
           // navigue vers entreprise-list pour ouvrir cette entreprise
            this.router.navigate(['/entreprise/entreprise-list']);
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
