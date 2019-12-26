import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Reactive Form Module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtInterceptor, ErrorInterceptor } from './interceptor';
import { JwtHelperService } from './services';

import { EntrepriseModule } from './entreprise/entreprise.module';
// import { ClientModule } from './entreprise/client/client.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PgMenuComponent } from './pg-menu/pg-menu.component';
// import { PgLoginFormComponent } from './pg-login-form/pg-login-form.component';
// import { RegisterModalFormComponent } from './register-modal-form/register-modal-form.component';
// import { PgEntrepriseCreateComponent } from './pg-entreprise-create/pg-entreprise-create.component';
import { PgRegisterComponent } from './pg-register/pg-register.component';
import { PgLoginComponent } from './pg-login/pg-login.component';
import { AlertComponent } from './alert/alert.component';
// import { ClientsListComponent } from './clients-list/clients-list.component';
// import { EntreprisesListComponent } from './entreprises-list/entreprises-list.component';
import { DirectivesModule } from './directives';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    PgMenuComponent,
    HomeComponent,
    // PgEntrepriseCreateComponent,
    PgLoginComponent,
    PgRegisterComponent,
    // ClientsListComponent,
    // EntreprisesListComponent
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
    DirectivesModule,
    // ClientModule,
    EntrepriseModule,
    AppRoutingModule
  ],
  providers: [
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
