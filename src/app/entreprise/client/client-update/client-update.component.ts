import { Component, OnInit } from '@angular/core';
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
export class ClientUpdateComponent implements OnInit {

  addressForm: FormGroup;
  client: Client;
  constructor() { }

  ngOnInit() {
    this.addressForm = new FormGroup({});
  }

  onSubmit() {
    console.log(this.addressForm.value);
  }

}
