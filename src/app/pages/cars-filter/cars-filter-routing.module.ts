import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsFilterPage } from './cars-filter';



const routes: Routes = [
  {
    path: '',
    component: CarsFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsFilterRoutingModule { }
