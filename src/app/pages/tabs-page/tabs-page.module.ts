import { ReservationInfoComponent } from './../reservation-info/reservation-info.component';
import { ReservationsComponent } from './../reservations/reservations.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { MapModule } from '../map/map.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { FilterPageComponent } from '../filter-page/filter-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { RegisterPage } from '../register/register';
import { AvailibleSlotsComponent } from '../availible-slots/availible-slots.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { VehicleComponent } from '../admin/vehicle/vehicle.component';
import { AddVehicleComponent } from '../admin/vehicle/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from '../admin/vehicle/edit-vehicle/edit-vehicle.component';
import { CarsFilterModule } from '../cars-filter/cars-filter.module';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapModule,
    ScheduleModule,
    TabsPageRoutingModule,
    CarsFilterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    TabsPage,
    UpdateProfileComponent,
    ReservationsComponent,
    NotificationsComponent,
    FilterPageComponent,
    SearchModalComponent,
    AvailibleSlotsComponent,
    RegisterPage,
    ReservationInfoComponent,
    VehicleComponent,
    AddVehicleComponent,
    EditVehicleComponent
  ], 
  providers: [CallNumber, InAppBrowser, AndroidPermissions, { provide: LOCALE_ID, useValue: 'fr-FR'}]
})
export class TabsModule { }
