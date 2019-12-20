import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { PgLoginComponent } from './pg-login/pg-login.component';
import { PgRegisterComponent } from './pg-register';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { PgEntrepriseCreateComponent } from './pg-entreprise-create/pg-entreprise-create.component';
import { Role } from './models';
import { AuthGuard } from './guard';
import { EntreprisesListComponent } from './entreprises-list/entreprises-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: PgLoginComponent },
  { path: 'entreprise/:entreprise_id/login', component: PgLoginComponent },
  { path: 'register', component: PgRegisterComponent },
  { path: 'entreprise/:entreprise_id/register', component: PgRegisterComponent },
  { path: 'clients', component: ClientsListComponent, canActivate: [AuthGuard] },
  { path: 'new_entreprise', component: PgEntrepriseCreateComponent,
    canActivate: [AuthGuard],
    data: {roles: Role.Admin} },
  { path: 'open_entreprise', component: EntreprisesListComponent, 
    canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
