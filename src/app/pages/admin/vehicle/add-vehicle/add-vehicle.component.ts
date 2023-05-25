import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { FilterService } from '../../../../shared/services/filter.service';
import { CarsService } from '../../../../shared/services/cars.service';

import { Plugins } from '@capacitor/core';
const {  Keyboard } = Plugins;

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent  implements OnInit {

  carForm: FormGroup;
  fuelTypes;
  brands;
  features;
  selectedFile: File | null;
  imageData: string | null;
  constructor(private fb: FormBuilder, private modalController: ModalController, private filter: FilterService, private cars: CarsService, private alertController: AlertController) { }

  ngOnInit() {
    //this should be updated
    this.carForm = this.fb.group({
      image: ['assets/img/vehicle1.jpg', Validators.required],
      title: ['', Validators.required],
      label: ['', Validators.required],
      price: ['', Validators.required],
      type: ['', Validators.required],
      brand: ['', Validators.required],
      feature: ['', Validators.required],
      passagers:['', Validators.required],
      valise:['', Validators.required],
      portes:['', Validators.required],
      description:['', Validators.required],
    });

    this.filter.getFuelTypes().subscribe((fuelType) => {
      this.fuelTypes = fuelType;
    });

    this.filter.getBrands().subscribe((brands) => {
      this.brands = brands;
    });

    this.filter.getFeatures().subscribe((feature) => {
      this.features = feature;
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

  async add(){

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    if(this.carForm.valid){
      this.cars.add(this.carForm.value).subscribe(
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
