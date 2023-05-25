import { CarsDetailPage } from './../cars-detail/cars-detail';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { FilterService } from '../../shared/services/filter.service';
import { CarsService } from '../../shared/services/cars.service';
@Component({
  selector: 'cars-filter',
  templateUrl: 'cars-filter.html',
  styleUrls: ['./cars-filter.scss'],
})
export class CarsFilterPage implements OnInit {
  @Input() title:string;
  @Input() label:string;
  content:boolean = false;
  @Input() dateOriginal;
  carsList: any[];
  features: any[];
  types: any[];
  constructor(
    private filter: FilterService,
    private modalController: ModalController, 
    private platform: Platform, 
    private cars: CarsService
  ) {}

  async ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //if (this.platform.is('android')) {
        //this.statusBar.overlaysWebView(true);
        // set status bar to white
        //this.statusBar.backgroundColorByHexString('#00FFFFFF');
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
    let start = new Date(this.dateOriginal.from.string);
    let end = new Date(this.dateOriginal.to.string);
    this.cars.findCarsByReservation(start, end)
    .subscribe(async response => {
      let body = JSON.parse(JSON.stringify(response));
      //console.log(body)
      if(body.length){
          this.carsList = body;
          
      }
      //should be remove
      setTimeout(() => {
        this.content = true;
      }, 100);
    });
  }

}
