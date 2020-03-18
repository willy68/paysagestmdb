import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Client } from 'src/app/models';

@Component({
  selector: 'pg-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {

  clientForm: FormGroup;
  client: Client;
  public loading = false;
  public submitted = false;
  constructor() { }

  ngOnInit() {
    this.clientForm = new FormGroup({});
    // console.log((<FormGroup>this.clientForm.controls['addressForm']));
    // this.f.firstName.patchValue('CL1');
  }

  // get f () { return (<FormGroup>this.clientForm.controls['addressForm']).controls; }

  onSubmit() {
    // console.log((<FormGroup>this.clientForm.controls['addressForm']).value);
    console.log(this.clientForm.value);
  }

  resetForm() {
    this.submitted = false;
    this.clientForm.reset(/*{
      code_client: { value: this.dernier_code, disabled: true }
    }*/);
  }
}
