import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { faUserCog } from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../services';
import { AlertService } from '../services';

// import custom validator to validate that password and confirm password fields match
import { mustMatch } from '../helpers/must-match.validator';

import { User } from '../users';

@Component({
  selector: 'pg-register',
  templateUrl: './pg-register.component.html',
  styleUrls: ['./pg-register.component.css']
})
export class PgRegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public submitted = false;
  public loading = false;
  public errorMessage = '';
  // public faUserCog = faUserCog;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private alertService: AlertService) {

  }

  registerFormBuild() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]] ,
      email: ['', [Validators.required, Validators.email]] ,
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      rememberMe: [null, []]
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
  get rememberMe() { return this.registerForm.get('rememberMe'); }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
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
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.controls[key].setErrors(null);
    });
  }

  ngOnInit() {
    this.registerFormBuild();
  }

}