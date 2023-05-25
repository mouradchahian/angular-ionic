
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CarsDetailPage } from './cars-detail';
import { CarsDetailRoutingModule } from './cars-detail-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CarsDetailRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [CarsDetailPage],
    bootstrap: []
})
export class CarsDetailModule {}
