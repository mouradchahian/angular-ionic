import { Component, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import {
  CalendarResult
} from 'ion2-calendar';
import { VehiclesPage } from '../vehicles/vehicles';
import { customCalendar } from '../../service/customCalendar';
import { Router } from '@angular/router';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulePage implements OnInit, AfterViewChecked {
  date: string = "Choisir dates";
  dateOriginal: CalendarResult;
  lieu:string = 'default';
  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private customCalendar: customCalendar,
    private router: Router
  ) { }

  ngAfterViewChecked() {
    var appl = document.querySelector(".buttons-last-slot");
    if(document.querySelector('.new-element') && appl ){
      document.querySelector('.new-element').appendChild(appl);
    }
  }

  async openCalendar() {
    await this.customCalendar.openCalendar();
    this.date = this.customCalendar.date;
  }

  ngOnInit() {}

  async loadVehicles(){
    if((this.lieu == "default" ) || (this.date == "Choisir dates"))
    {
      const toast = await this.toastCtrl.create({
        message: 'Merci de séléctionner un filter pour procédurer!!!',
        duration: 3000,
        cssClass: 'warning-toast',
        color:'warning',
        icon:'warning'
      });
    
      toast.present();
      return;
    }
    const vehicles = await this.modalCtrl.create({
      component: VehiclesPage,
      componentProps: {
        title:this.lieu,
        label:this.date,
        dateOriginal: this.customCalendar.dateOriginal
      }
    });

    vehicles.present();

  }

  ionViewWillEnter() {
    this.router.navigateByUrl('/apps/tabs/schedule', { replaceUrl: true });
    //this.menu.enable(false);
  }
  
}
