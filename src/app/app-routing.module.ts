import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { PgLoginComponent } from './pg-login/pg-login.component';
import { PgRegisterComponent } from './pg-register';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
    // canActivate: [AuthGuard]
  },
  { path: 'login', component: PgLoginComponent },
  { path: 'register', component: PgRegisterComponent },
  /*{ path: 'clients', component: ClientsListComponent },*/

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
