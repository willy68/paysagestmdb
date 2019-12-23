import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { EntrepriseDashboardComponent } from './entreprise-dashboard/entreprise-dashboard.component';
import { EntrepriseListComponent } from './entreprise-list/entreprise-list.component';
import { EntrepriseCreateComponent } from './entreprise-create/entreprise-create.component';


const entrepriseRoutes: Routes = [
  {
    path: 'entreprise',
    component: EntrepriseComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'entreprise-list', component: EntrepriseListComponent },
          { path: 'entreprise-create', component: EntrepriseCreateComponent },
          { path: '', component: EntrepriseDashboardComponent }
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
