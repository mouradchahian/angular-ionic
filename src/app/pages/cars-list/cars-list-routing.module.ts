import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsListPage } from './cars-list';



const routes: Routes = [
  {
    path: '',
    component: CarsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsListRoutingModule { }
