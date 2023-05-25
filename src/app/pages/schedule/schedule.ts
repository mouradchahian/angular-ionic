import { Component, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CalendarResult } from 'ion2-calendar';
import { customCalendar } from '../../shared/services/customCalendar';
import { Router } from '@angular/router';
import { CarsFilterPage } from '../cars-filter/cars-filter';
import { ToastService } from '../../shared/services/toast.service';

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
    private customCalendar: customCalendar,
    private router: Router,
    private toastService: ToastService
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
    if((this.lieu != "default" ) || (this.date != "Choisir dates"))
    {
      const vehicles = await this.modalCtrl.create({
        component: CarsFilterPage,
        componentProps: {
          title:this.lieu,
          label:this.date,
          dateOriginal: this.customCalendar.dateOriginal
        }
      });
  
      return vehicles.present();
    }

    this.toastService.showError('Merci de séléctionner un filter pour procédurer!!!');
  }

  ionViewWillEnter() {
    this.router.navigateByUrl('/apps/tabs/schedule', { replaceUrl: true });
    //this.menu.enable(false);
  }
  
}
