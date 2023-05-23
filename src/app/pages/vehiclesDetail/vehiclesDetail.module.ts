
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { vehiclesDetailRoutingModule } from './vehiclesDetail-routing.module';
import { vehiclesDetailPage } from './vehiclesDetail';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        vehiclesDetailRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [vehiclesDetailPage],
    bootstrap: []
})
export class vehiclesDetailModule {}
