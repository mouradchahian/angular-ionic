import { formatDate } from '@angular/common';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarModal, CalendarResult } from 'ion2-calendar';

@Injectable({
    providedIn: 'root'
})

export class customCalendar {
    date: string;
    myCalendar: HTMLIonModalElement;
    from: number;
    to: number;
    dateOriginal: CalendarResult;
    private renderer: Renderer2;
    //private subject = new Subject();

    constructor(
        private modalCtrl: ModalController,
        rendererFactory: RendererFactory2
    ){
        this.renderer = rendererFactory.createRenderer(null, null);
    }



    async openCalendar() {
    
        const options = {
          pickMode: 'range',
          title: 'Sélectionnez Dates',
          id:'cal' ,
          doneLabel: 'appliquer'
        };
    
        this.myCalendar = await this.modalCtrl.create({
          component: CalendarModal,
          componentProps: { options },
          id: 'calender'
    
        });
        
        this.myCalendar.present();
    
        const newElement = document.createElement('div');
        newElement.className = 'new-element';
        newElement.innerHTML = '<div id="range-container"><ion-label>Ramasser</ion-label><ion-range value="6" pin="true" snaps="true" min="1" max="12" id="my-range1" class="my-range"></ion-range><ion-label id="depart">06:00 AM</ion-label></div><div id="range-container"><ion-label>Déposer</ion-label><ion-range id="my-range2" value="6" pin="true" snaps="true" min="1" max="12" class="my-range"></ion-range><ion-label id="retour">06:00 AM</ion-label></div><div class="button-container text-center"></div>';
    
    
        document.getElementById("calender").appendChild(newElement);
        var element1 = document.getElementById('my-range1');
        var element2 = document.getElementById('my-range2');
    
        this.renderer.listen(element1, 'ionChange', (event) => {
          this.from = parseInt((event.target as HTMLInputElement).value, 10);
          var d = document.getElementById('depart');
          d.innerHTML = (this.from).toLocaleString('fr-FR', {minimumIntegerDigits: 2, useGrouping:false}) + ':00 AM';
        });
        this.renderer.listen(element2, 'ionChange', (event) => {
          this.to = parseInt((event.target as HTMLInputElement).value, 10);
          var r = document.getElementById('retour');
          r.innerHTML = (this.to).toLocaleString('fr-FR', {minimumIntegerDigits: 2, useGrouping:false}) + ':00 AM';
        });
    
        const event: any = await this.myCalendar.onDidDismiss();
        const date: CalendarResult = event.data;
        this.dateOriginal = date;
        const format = 'dd MMM yyyy';
        const myDate = date['from'].string;
        const locale = 'fr-FR';
        const from = formatDate(myDate, format, locale);
        const to = formatDate(date['to'].string, format, locale);
        this.date = from + ' - ' + to;
      }
}