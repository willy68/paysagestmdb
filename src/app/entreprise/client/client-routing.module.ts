import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientUpdateComponent } from './client-update/client-update.component';
import { ClientComponent } from './client/client.component';
import { AuthGuard } from 'src/app/guard';

const clientRoutes: Routes = [
  {
    path: 'entreprise/clients',
    component: ClientComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'client-create', component: ClientCreateComponent },
          { path: 'client-update', component: ClientUpdateComponent },
          { path: '', component: ClientsListComponent }
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
