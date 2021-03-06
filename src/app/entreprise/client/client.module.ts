import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Reactive Form Module

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DirectivesModule } from '../../directives';

import { ClientRoutingModule } from './client-routing.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientUpdateComponent } from './client-update/client-update.component';
import { ClientComponent } from './client/client.component';
import { AdresseCreateComponent } from './adresse-create/adresse-create.component';
import { AdresseListComponent } from './adresse-list/adresse-list.component';
import { ClientFormComponent } from '../../forms/client/client-form/client-form.component';
import { AdresseComponent } from './adresse/adresse.component';


@NgModule({
  declarations: [
    ClientsListComponent,
    ClientCreateComponent,
    ClientUpdateComponent,
    ClientComponent,
    AdresseCreateComponent,
    AdresseListComponent,
    ClientFormComponent,
    AdresseComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ClientRoutingModule,
    TypeaheadModule.forRoot()
  ]
})
export class ClientModule { }
