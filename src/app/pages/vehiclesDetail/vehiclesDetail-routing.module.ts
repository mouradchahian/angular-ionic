import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { vehiclesDetailPage } from './vehiclesDetail';



const routes: Routes = [
  {
    path: '',
    component: vehiclesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class vehiclesDetailRoutingModule { }
