import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Reactive Form Module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtInterceptor, ErrorInterceptor } from './interceptor';
import { JwtHelperService } from './services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PgMenuComponent } from './pg-menu/pg-menu.component';
// import { PgLoginFormComponent } from './pg-login-form/pg-login-form.component';
// import { RegisterModalFormComponent } from './register-modal-form/register-modal-form.component';
import { PgRegisterComponent } from './pg-register/pg-register.component';
import { PgLoginComponent } from './pg-login/pg-login.component';
// import { AlertComponent } from './alert/alert.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { HighlightTableRowDirective } from './directives';

@NgModule({
  declarations: [
    AppComponent,
    PgMenuComponent,
    HomeComponent,
    PgLoginComponent,
    PgRegisterComponent,
    ClientsListComponent,
    HighlightTableRowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot()
  ],
  providers: [
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
