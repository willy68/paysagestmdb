import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, EntrepriseStorageService } from '../services';
import { AlertService } from '../services';
import { Role } from '../models';

// import custom validator to validate that password and confirm password fields match
import { mustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'pg-register',
  templateUrl: './pg-register.component.html',
  styleUrls: ['./pg-register.component.css']
})
export class PgRegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public entreprise_id: number;
  public roles = Role;
  public Role = Role.Admin;
  public submitted = false;
  public loading = false;
  public title = 'S\'enregistrer en tant qu\'administrateur';
  public errorMessage = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private entrepriseStorageService: EntrepriseStorageService,
              private alertService: AlertService) {
    const currentEntreprise = this.entrepriseStorageService.currentEntrepriseValue;
    if (currentEntreprise) {
      // this.entreprise_id = currentEntreprise.id;
      this.Role = Role.User;
      this.title = `Enregistrer un utilisateur pour ${currentEntreprise.nom}`;
    }
  }

  registerFormBuild() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]] ,
      email: ['', [Validators.required, Validators.email]] ,
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      role: [this.Role, []]
    }, {
      validator: mustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get username() { return this.registerForm.get('required'); }
  get email() { return this.registerForm.get('required'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get role() { return this.registerForm.get('role'); }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value,
      this.entreprise_id ? this.entreprise_id : null)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.loading = false;
                this.router.navigate(['/login']);
              },
            error => {
                this.alertService.error(error);
                this.loading = false;
                this.errorMessage = error;
            });
  }

  resetForm() {
    this.submitted = false;
    this.errorMessage = '';
    this.registerForm.reset();
    /*Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.controls[key].setErrors(null);
    });*/
  }

  ngOnInit() {
    this.registerFormBuild();
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
      this.entreprise_id = +params.get('entreprise_id');
    });

  }

}
