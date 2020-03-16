import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Reactive form services
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdresseService, AdresseTypeService,
         CpvilleService, AlertService } from 'src/app/services';
import { switchMap, catchError, first, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AdresseType, Cpville } from 'src/app/models';

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/ngx-bootstrap-typeahead';

@Component({
  selector: 'pg-adresse-create',
  templateUrl: './adresse-create.component.html',
  styleUrls: ['./adresse-create.component.scss']
})
export class AdresseCreateComponent implements OnInit {
  public adresses_type: Observable<AdresseType[]>;
  private client_id: number;
  public client_nom: string;
  public createForm: FormGroup;
  public submitted = false;
  public loading = false;

  public cpSearch: Observable<Cpville[]>;
  public TypeheadCpLoading: boolean;
  public noCpResult = false;

  public villeSearch: Observable<Cpville[]>;
  public TypeheadVilleLoading: boolean;
  public noVilleResult = false;


  constructor(private fb: FormBuilder,
    private adresseService: AdresseService,
    private adresseTypeService: AdresseTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private cpvilleService: CpvilleService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.createFormBuild();
    this.adresses_type = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.client_id = +params.get('id');
        this.client_nom = params.get('client');
        return this.adresseTypeService.getAll().pipe(
          tap(adresseType => {
            this.adresse_type.setValue(adresseType[0].id);
          }),
          catchError(err => {
            return [];
          })
        );
      })
    );
    this.cpSearch = new Observable((observer: any) => {
      // Runs on every search
      observer.next(this.cp.value);
    })
      .pipe(
        switchMap((token: string) => this.cpvilleService.search('cp', { search: token }, '?limit=15').pipe(
          catchError(() => of<Cpville[]>(null)
          ))
        ));
    this.villeSearch = new Observable((observer: any) => {
      // Runs on every search
      observer.next(this.ville.value);
    })
      .pipe(
        switchMap((token: string) => this.cpvilleService.search('ville', { search: token }, '?limit=15').pipe(
          catchError(() => of<Cpville[]>(null)
          ))
        ));

  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  get adresse_1() { return this.createForm.get('adresse_1'); }
  get adresse_2() { return this.createForm.get('adresse_2'); }
  get adresse_3() { return this.createForm.get('adresse_3'); }
  get cp() { return this.createForm.get('cp'); }
  get ville() { return this.createForm.get('ville'); }
  get pays() { return this.createForm.get('pays'); }
  get adresse_type() { return this.createForm.get('adresse_type'); }

  createFormBuild() {
    this.createForm = this.fb.group({
      adresse_1: ['', [Validators.required]],
      adresse_2: ['', []],
      adresse_3: ['', []],
      cp: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      pays: ['', []],
      adresse_type: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid or currentUser is null
    if (this.createForm.invalid || !this.client_id) {
      return;
    }

    this.loading = true;
    this.adresseService.create(this.client_id, {
      adresse_1: this.f.adresse_1.value,
      adresse_2: this.f.adresse_2.value,
      adresse_3: this.f.adresse_3.value,
      cp: this.f.cp.value,
      ville: this.f.ville.value,
      pays: this.f.pays.value,
      adresse_type_id: this.f.adresse_type.value
    })
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('SUCCESS!! : Adresse create.');
          // navigue vers entreprise-list pour ouvrir cette entreprise
          this.router.navigate(['../../'], {relativeTo: this.route});
        },
        error => {
          this.alertService.error(error);
        });
    this.loading = false;
  }

  backClientList() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  resetForm() {
    this.submitted = false;
    this.createForm.reset();
    /*Object.keys(this.createForm.controls).forEach(key => {
      this.createForm.controls[key].setErrors(null);
    });*/
  }

  cpTypeaheadLoading(e: boolean): void {
    this.TypeheadCpLoading = e;
  }

  onCpSelect(e: TypeaheadMatch): void {
    this.ville.patchValue(e.item.ville);
  }

  typeaheadNoCpResults(event: boolean): void {
    this.noCpResult = event;
  }

  villeTypeaheadLoading(e: boolean): void {
    this.TypeheadVilleLoading = e;
  }

  onVilleSelect(e: TypeaheadMatch): void {
    this.cp.patchValue(e.item.cp);
  }

  typeaheadNoVilleResults(event: boolean): void {
    this.noVilleResult = event;
  }
}
