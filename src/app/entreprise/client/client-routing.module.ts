import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const clientRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
