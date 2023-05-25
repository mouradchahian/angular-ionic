import { CalendarModule } from 'ion2-calendar';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SchedulePage } from './schedule';
import { SchedulePageRoutingModule } from './schedule-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        IonicModule,
        SchedulePageRoutingModule,
        CalendarModule.forRoot({
            closeIcon: true
          }),
    ],
    declarations: [
        SchedulePage
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR'},
    ]
})
export class ScheduleModule { }
