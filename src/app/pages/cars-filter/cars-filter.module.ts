import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CarsFilterPage } from './cars-filter';
import { CarsFilterRoutingModule } from './cars-filter-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CarsFilterRoutingModule
    ],
    declarations: [CarsFilterPage],
    bootstrap: []
})
export class CarsFilterModule {}
