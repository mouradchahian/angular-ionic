import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { FilterService } from '../../../../service/filter.service';
import { CarsService } from '../../../../service/cars.service';

import { Plugins } from '@capacitor/core';
const {  Keyboard } = Plugins;

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent  implements OnInit {
  carForm: FormGroup;
  fuelTypes;
  brands;
  features;
  selectedFile: File | null;
  imageData: string | null;
  @Input() car: any;
  selectedFuelType;
  constructor(private fb: FormBuilder, private modalController: ModalController, private filter: FilterService, private cars: CarsService, private alertController: AlertController) { }

  ngOnInit() {

    this.carForm = this.fb.group({
      image: [this.car.image, Validators.required],
      title: [this.car.title, Validators.required],
      label: [this.car.label, Validators.required],
      price: [this.car.price, Validators.required],
      type: [this.car.type, Validators.required],
      brand: [this.car.brand, Validators.required],
      feature: [this.car.feature, Validators.required],
      passagers:[this.car.passagers, Validators.required],
      valise:[this.car.valise, Validators.required],
      portes:[this.car.portes, Validators.required],
      description:[this.car.description, Validators.required],
    });

    this.filter.getFuelTypes().subscribe((fuelType) => {
      this.fuelTypes = fuelType;
      this.selectedFuelType = this.car.type;
    });

    this.filter.getBrands().subscribe((brands) => {
      this.brands = brands;
      this.carForm.get('brand').setValue(this.car.brand);
    });

    this.filter.getFeatures().subscribe((feature) => {
      this.features = feature;
      this.carForm.get('feature').setValue(this.car.feature);
    });

  }

  ngAfterViewInit(){
    Keyboard.addListener('keyboardWillShow', (info) => {
      document.body.classList.add('keyboard-is-open');
      document.documentElement.style.setProperty('--keyboard-height', - info.keyboardHeight + 'px');
    });
    Keyboard.addListener('keyboardDidShow', (info) => {
      document.activeElement.scrollIntoView({behavior: 'smooth'});
      document.documentElement.style.setProperty('--keyboard-height', - info.keyboardHeight + 'px');
    });  
    Keyboard.addListener('keyboardWillHide', (info) => {
      document.body.classList.remove('keyboard-is-open');
    });     
  }

  async edit(){

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    if(this.carForm.valid){
      this.cars.edit(this.car.id, this.carForm.value).subscribe(
        async car => {
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Votre Profile est modifié avec success !!!',
            buttons: ['OK'],
            cssClass:'success'
          });
          await alert.present();
          this.carForm.reset();
          this.closeModal();
        })
      }

  }

  closeModal() {
    this.modalController.dismiss();
  }

  onFileSelected(event: any) {
    //this.selectedFile = event.target.files[0];
  }

}
