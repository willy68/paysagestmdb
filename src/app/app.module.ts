import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Reactive Form Module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor, ErrorInterceptor } from './interceptor';
import { JwtHelperService } from './services';

import { EntrepriseModule } from './entreprise/entreprise.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PgMenuComponent } from './pg-menu/pg-menu.component';
import { PgRegisterComponent } from './pg-register/pg-register.component';
import { PgLoginComponent } from './pg-login/pg-login.component';
import { AlertComponent } from './alert/alert.component';
import { DirectivesModule } from './directives';
import { YesnomodalComponent } from './yesnomodal/yesnomodal.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    PgMenuComponent,
    HomeComponent,
    PgLoginComponent,
    PgRegisterComponent,
    YesnomodalComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    TypeaheadModule.forRoot(),
    DirectivesModule,
    EntrepriseModule,
    AppRoutingModule
  ],
  entryComponents: [ YesnomodalComponent ],
  providers: [
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
