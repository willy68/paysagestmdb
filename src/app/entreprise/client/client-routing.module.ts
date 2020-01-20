import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guard';

import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientUpdateComponent } from './client-update/client-update.component';
import { ClientComponent } from './client/client.component';
import { AdresseCreateComponent } from './adresse-create/adresse-create.component';
import { AdresseListComponent } from './adresse-list/adresse-list.component';

const clientRoutes: Routes = [
  {
    path: 'entreprise/:entreprise_id/clients',
    component: ClientComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'client-create', component: ClientCreateComponent },
          { path: 'client-update/:id', component: ClientUpdateComponent },
          { path: '', component: ClientsListComponent },
          { path: 'client/:id/adresse-create', component: AdresseCreateComponent },
          { path: 'client/:id/adresse-list', component: AdresseListComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
