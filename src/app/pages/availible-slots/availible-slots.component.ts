import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarsDetailPage } from '../cars-detail/cars-detail';

@Component({
  selector: 'app-availible-slots',
  templateUrl: './availible-slots.component.html',
  styleUrls: ['./availible-slots.component.scss'],
})
export class AvailibleSlotsComponent  implements OnInit {
  @Input() availableIntervals;
  @Input() title;
  @Input() car;
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  async reserver(slot)
  {
    const format = 'dd MMM yyyy';
    const locale = 'fr-FR';
    let dateSt = new Date(slot.startDate); // get current date
    dateSt.setDate(dateSt.getDate() + 1);

    let dateEn = new Date(slot.endDate); // get current date
    dateEn.setDate(dateEn.getDate() - 1);

    let intervalCreneux = {
      'from':{
        'string':formatDate(dateSt, "yyyy-MM-dd", locale).toString()
      },
      'to':{
        'string':formatDate(dateEn, "yyyy-MM-dd", locale).toString()
      }
    }
    
    const from = formatDate(dateSt, format, locale);
    const to = formatDate(dateEn, format, locale);
    const vehicles = await this.modalController.create({
      component: CarsDetailPage,
      componentProps: {
        label:from + ' - ' + to,
        dateOriginal: intervalCreneux,
        car: this.car
      }
    });
    vehicles.present();
    const event: any = await vehicles.onDidDismiss();
    //this.ngOnInit();
  }
}
