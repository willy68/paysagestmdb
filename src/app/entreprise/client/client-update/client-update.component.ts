import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first, takeUntil, switchMap, tap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClientService, AlertService, DernierCodeService } from 'src/app/services';
import { Subject, Observable } from 'rxjs';
import { Client, DernierCode } from 'src/app/models';

@Component({
  selector: 'pg-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit, AfterViewInit {

  addressForm: FormGroup;
  client: Client;
  public loading = false;
  constructor() { }

  ngOnInit() {
    this.addressForm = new FormGroup({});
    console.log((<FormGroup>this.addressForm.controls['addressForm']));
    // this.f.firstName.patchValue('CL1');
  }

  ngAfterViewInit() {
    console.log((<FormGroup>this.addressForm.controls['addressForm']));
    // this.f.lastName.patchValue('CL1');
  }

  get f () { return (<FormGroup>this.addressForm.controls['addressForm']).controls; }

  onSubmit() {
    console.log((<FormGroup>this.addressForm.controls['addressForm']).value);
  }
  resetForm() {
    // this.submitted = false;
    this.addressForm.reset(/*{
      code_client: { value: this.dernier_code, disabled: true }
    }*/);
  }
}
