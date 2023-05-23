import { VehicleRoutingModule } from './vehicles-routing.module';
import { VehiclePage } from './vehicles';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VehicleRoutingModule
    ],
    declarations: [VehiclePage],
    bootstrap: []
})
export class VehicleModule {}
