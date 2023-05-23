import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarsService } from '../../../service/cars.service';
import { AlertController, Config, ModalController } from '@ionic/angular';
import { DataTable } from '../interface/datatable';
import { PageRequest } from '../interface/pageRequest';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent  implements OnInit {

  cars:any[] = [];
  uploadedImage: string;
  user:any;
  @Input()
  public config: Config;

  @Input()
  public data: DataTable<any>;

  public size = 5;
  public pageNumber = 0;

  @Output()
  public newPage: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();

  @Output()
  public selection: EventEmitter<number> = new EventEmitter<number>();
  
  constructor(
    private carsService: CarsService, 
    private modalController: ModalController, 
    private _location: Location, 
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.uploadedImage = this.user.image ?? "assets/img/profile.png";
    this.carsService.getCars()
    .subscribe(async response => {
      let body = JSON.parse(JSON.stringify(response));
      if(body.length){
        this.cars = body;
      }
    })
  }


  public changePage(pageNum: number) {
    const num = (pageNum < 0) ? 0 :
      (pageNum >= this.data.lastPage) ? (this.data.lastPage - 1) : pageNum;

    this.pageNumber = num;

    this.newPage.emit({
      page: num,
      size: Number(this.size)
    });
  }

  public onSelect (index: number) {
    this.selection.emit(index + (this.pageNumber * this.size));
  }

  back(){
    this._location.back();
  }

  async addCar() {
    const modal = await this.modalController.create({
      component: AddVehicleComponent,
    });
    await modal.present();
    const detail: any = await modal.onDidDismiss();
    this.ngOnInit();
    //itemT.close();
  }

  async editCar(car) {
    const modal = await this.modalController.create({
      component: EditVehicleComponent,
      componentProps:{
        car:car
      }
    });
    await modal.present();
    const detail: any = await modal.onDidDismiss();
    this.ngOnInit();
  }

  async deleteItem(item) {
    const alert = await this.alertController.create({
      header: 'Suppression confirmation',
      message: 'Etes vous sur vous voulez supprimer cette vehicle?',
      cssClass: 'supp-confirmation',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            // Call the method to delete the record
            this.carsService.delete(item.id).subscribe(respose => {
              const index = this.cars.indexOf(item);
              this.cars.splice(index, 1);
            })
            
          }
        }
      ]
    });
  
    await alert.present();
    
  }

}
