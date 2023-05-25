
import { Component, Input, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { CarsService } from '../../shared/services/cars.service';
import { AvailibleSlotsComponent } from '../availible-slots/availible-slots.component';
import { FilterService } from '../../shared/services/filter.service';
import { formatDate } from '@angular/common';
import { CarsDetailPage } from '../cars-detail/cars-detail';


@Component({
  selector: 'cars-list',
  templateUrl: 'cars-list.html',
  styleUrls: ['./cars-list.scss'],
})
export class CarsListPage implements OnInit {
  @Input() title:string;
  @Input() label:string;
  content:boolean = false;
  @Input() dateOriginal;
  carsList: any[];
  features: any[];
  types: any[];
  constructor(
    private filter: FilterService,
    private cars: CarsService,
    private modalController: ModalController, 
    private platform: Platform, 
    private statusBar: StatusBar) {}

  async ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //if (this.platform.is('android')) {
        this.statusBar.overlaysWebView(true);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#00FFFFFF');
        this.getFeatures();
        this.getType();
        this.getCars();
      //}
      
    });
  }
  
  closeModal(){
    this.initializeApp();
    this.modalController.dismiss();
    
  }

  async detail(car){
    const vehicles = await this.modalController.create({
      component: CarsDetailPage,
      componentProps: {
        title:this.title,
        label:this.label,
        dateOriginal: this.dateOriginal,
        car: car
      }
    });

    vehicles.present();
    const event: any = await vehicles.onDidDismiss();
    this.ngOnInit();
  }

  ionViewWillEnter() {
    this.ngOnInit()
  }

  handleRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  slots(car){
    car.reservations.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    // create a new list for available intervals
    let availableIntervals = [];

    // loop through sorted reservations and find available intervals
    for (let i = 1; i < car.reservations.length; i++) {
      let current = car.reservations[i];
      let next = car.reservations[i - 1];
      if (new Date(current.start) > new Date(next.end) && ((new Date(current.start).getTime() - new Date(next.end).getTime()) != 86400000) ) {
        // there is an available interval between current and next
        availableIntervals.push({
          startDate: next.end,
          endDate: current.start
        });
      }
    }
    return availableIntervals;
  }

  checkAvailibleSlot(car): boolean
  {
    let availableIntervals = this.slots(car);
    if(availableIntervals.length > 0){
      return true;
    }
    return false;
  }

  async showAvailibleSlots(car)
  {
    let availableIntervals = this.slots(car);
    const vehicles = await this.modalController.create({
      component: AvailibleSlotsComponent,
      id:"slotModal",
      componentProps: {
        availableIntervals: availableIntervals,
        title:car.title,
        car:car
      }
    });

    vehicles.present();
    const event: any = await vehicles.onDidDismiss();
  }

  getFeatures(){
    this.filter.getFeatures()
    .subscribe(async response => {
      let body = JSON.parse(JSON.stringify(response));
      if(body.length){
           this.features = body;
        }
      })
  }

  findFeeatures(featu){
    return this.features.filter(f => [...featu].includes(f.id));
  }

  getType(){
    this.filter.getFuelTypes()
    .subscribe(async response => {
      let body = JSON.parse(JSON.stringify(response));
      if(body.length){
           this.types = body;
        }
      })
  }

  findType(type){
    return this.types.find(t => type === t.id) ?? '';
  }

  getCars()
  {
    const savedFilterOptions = localStorage.getItem('savedFilterOptions');
    const filters = savedFilterOptions ? JSON.parse(savedFilterOptions) : [];
    this.cars.findCars()
    .subscribe(async response => {
      let body = JSON.parse(JSON.stringify(response));
      if(body.length){
          this.carsList = body.filter(car => {
            if(filters && filters.length != 0){
              let filterBrand = filters.brand.includes(car.brand);
              let filterFeature = filters.feature.some(r=> car.feature.includes(r));
              let filterType = filters.fuelType.includes(car.type);
              if(filters.brand.length > 0 && !filterBrand)
              {
                return false;
              }
              else if(filters.feature.length > 0 && !filterFeature){
                return false;
              }
              else if(filters.fuelType.length > 0 && !filterType){
                return false;
              }
            }

            return true;
          }).map(car => ({
            ...car,
            reservations: car.reservations.filter(reservation => {
              let last = car.reservations?.[car.reservations.length-1];

              let endDate :any = new Date(last.end);

              if(formatDate(new Date(), "yyyy-MM-dd", "fr-FR") < formatDate(endDate, "yyyy-MM-dd", "fr-FR") && reservation.active){
                return true;
              }
            })
          }));
          setTimeout(() => {
            this.content = true;
          }, 100);
          
      }
    });
  }
}
