import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guard';

import { EntrepriseComponent } from './entreprise/entreprise.component';
import { EntrepriseDashboardComponent } from './entreprise-dashboard/entreprise-dashboard.component';
import { EntrepriseListComponent } from './entreprise-list/entreprise-list.component';
import { EntrepriseCreateComponent } from './entreprise-create/entreprise-create.component';
import { EntrepriseEditComponent } from './entreprise-edit/entreprise-edit.component';
import { Role } from '../models';


const entrepriseRoutes: Routes = [
  {
    path: 'entreprise',
    component: EntrepriseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', component: EntrepriseListComponent },
          { path: 'entreprise-create',
            component: EntrepriseCreateComponent,
            data: {roles: Role.Admin}
          },
          { path: 'entreprise-edit/:id',
            component: EntrepriseEditComponent,
            data: {roles: Role.Admin}
          },
          { path: ':id', component: EntrepriseDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(entrepriseRoutes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }
