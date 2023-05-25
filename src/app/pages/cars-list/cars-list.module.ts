import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CarsListPage } from './cars-list';
import { CarsListRoutingModule } from './cars-list-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CarsListRoutingModule
    ],
    declarations: [CarsListPage],
    bootstrap: []
})
export class CarsListModule {}
