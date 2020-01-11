import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Reactive Form Module

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DirectivesModule } from '../directives';
import { ClientModule } from './client/client.module';

import { EntrepriseRoutingModule } from './entreprise-routing.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { EntrepriseDashboardComponent } from './entreprise-dashboard/entreprise-dashboard.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { EntrepriseListComponent } from './entreprise-list/entreprise-list.component';
import { EntrepriseEditComponent } from './entreprise-edit/entreprise-edit.component';
import { EntrepriseCreateComponent } from './entreprise-create/entreprise-create.component';


@NgModule({
  declarations: [
    EntrepriseDashboardComponent,
    EntrepriseComponent,
    EntrepriseListComponent,
    EntrepriseEditComponent,
    EntrepriseCreateComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    ClientModule,
    EntrepriseRoutingModule,
    TypeaheadModule.forRoot()
  ]
})
export class EntrepriseModule { }
