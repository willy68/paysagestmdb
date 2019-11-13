import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { first } from 'rxjs/operators';
// import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

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
  // public faSignInAlt = faSignInAlt;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginFormBuild();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginFormBuild() {
    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]] ,
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
    this.authenticationService.login(this.f.email.value, this.f.password.value)
    .pipe(first())
    .subscribe(
        data => {
            // this.router.navigate([this.returnUrl]);
            this.alertService.success('SUCCESS!! : ' + data.username + ' '
                                                    + data.email);
           // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data));
            this.router.navigate(['/home']);
        },
        error => {
            this.alertService.error(error);
            this.errorMessage = error;
        });
        this.loading = false;
  }

  resetForm() {
    this.submitted = false;
    this.errorMessage = '';
    this.loginForm.reset();
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.controls[key].setErrors(null);
    });
  }
}
