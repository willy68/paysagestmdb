import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Reactive form services
import { first } from 'rxjs/operators';

// import custom validator to validate that password and confirm password fields match
import { mustMatch } from '../helpers/must-match.validator';
import { AuthenticationService, AlertService } from '../services';

@Component({
  selector: 'pg-login',
  templateUrl: './pg-login.component.html',
  styleUrls: ['./pg-login.component.css']
})
export class PgLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  public loading = false;
  public errorMessage = '';
  // public returnUrl: string;
  public entreprise_id: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginFormBuild();
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
      this.entreprise_id = +params.get('entreprise_id');
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginFormBuild() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      rememberMe: [null, []]
    }, {
      validator: mustMatch('password', 'confirmPassword')
    });
  }

  get email() { return this.loginForm.get('required'); }
  get password() { return this.loginForm.get('password'); }
  get confirmPassword() { return this.loginForm.get('confirmPassword'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(
      this.f.email.value,
      this.f.password.value,
      this.entreprise_id ? this.entreprise_id : null)
      .pipe(first())
      .subscribe(
        data => {
          const id = this.entreprise_id ? '/' + this.entreprise_id : '';
          const url = this.authenticationService.returnUrl ?
                      this.router.parseUrl(this.authenticationService.returnUrl) :
                      '/entreprise' + id;
          this.router.navigateByUrl(url);
          this.alertService.success('Bienvenue : ' + data.username);
        },
        error => {
          let errorMessage = 'Une erreur est survenu, impossible de se connecter';
          if ( typeof error === 'string' ) {
            errorMessage = error;
          }
          this.alertService.error(errorMessage);
          this.errorMessage = errorMessage;
        });
    this.loading = false;
  }

  resetForm() {
    this.submitted = false;
    this.errorMessage = '';
    this.loginForm.reset();
    /* Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.controls[key].setErrors(null);
    });*/
  }
}
