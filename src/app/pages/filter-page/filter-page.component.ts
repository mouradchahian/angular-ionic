import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterService } from '../../shared/services/filter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
})
export class FilterPageComponent  implements OnInit {
  checkboxGroupControl: FormControl;
  filterForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private _location: Location, private filter: FilterService) {
    this.checkboxGroupControl = new FormControl(['']);
   }

  brands: any = [];
  fuelTypes: any = [];
  features: any = [];
  ionSelect: FormControl = new FormControl([]);
  selectedBrand: any = [];
  selectedFuelType: any = [];
  selectedPrice: { lower: number, upper: number } = { lower: 0, upper: 2500 };
  selectedFeatures: any = [];


  ngOnInit() {
    this.selectedFeatures = [];
    this.selectedBrand = [];
    this.selectedFuelType = [];
    const savedFilterOptions = localStorage.getItem('savedFilterOptions');
    const filters = savedFilterOptions ? JSON.parse(savedFilterOptions) : [];

    this.filter.getBrands().subscribe((brands) => {
      this.brands = brands;
      this.selectedBrand = filters.brand ?? [];
    });
    this.filter.getFuelTypes().subscribe((fuelType) => {
      this.fuelTypes = fuelType;
      this.selectedFuelType = filters.fuelType ?? [];
    });
    this.filter.getFeatures().subscribe((feature) => {
      this.features = feature;
      this.selectedFeatures = filters.feature ?? [];
    });
    
    this.filterForm = this.formBuilder.group({
      brand: ['', Validators.required],
      fuel: ['', Validators.required],
      price: ['', Validators.required],
      features: this.formBuilder.group({
        airConditioning: [false],
        automaticTransmission: [false],
        gpsNavigation: [false],
        bluetoothAudio: [false],
      }),
    });
  }

  back(){
    this._location.back();
  }

  async applyFilter() {
    const f = {
      brand: this.selectedBrand,
      feature: this.selectedFeatures,
      fuelType: this.selectedFuelType
    };
    localStorage.setItem('savedFilterOptions', JSON.stringify(f));
    await Swal.fire({
      title: '',
      html:'<div><ion-icon name="checkmark-outline" class="filter-icon-added"></ion-icon> <ion-label class="filter-added">Modifications sur le filter sont Appliquer</ion-label></div>',
      showCancelButton: false,
      confirmButtonText: 'Fermer',
      position:'bottom',
      showClass: {
        popup: 'animate__animated animate__slideInUp animate__faster remove-filter'
      },
      hideClass: {
        popup: 'animate__animated animate__slideOutDown remove-filter'
      }
    });
  }

  checkIfSelected(id): boolean {
    return this.selectedFeatures.some(item => item == id);
  }

  checkedd(event, id)
  {
    if(!event.detail.checked){
        const index = this.selectedFeatures.findIndex(item => item === id);
        if (index !== -1) {
          this.selectedFeatures.splice(index, 1);
        }
    }else{
      this.selectedFeatures.push(id);
    }
    return;
  }

  onChange(item) {
    console.log(item);
    if(this.selectedFeatures.includes(item)) {
      this.selectedFeatures = this.selectedFeatures.filter((value)=>value!=item);
    } else {
      this.selectedFeatures.push(item)
    }
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  handleRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  async removeFilter() {
    localStorage.setItem('savedFilterOptions', '');
    await Swal.fire({
      title: '',
      html:'<div><ion-icon name="close-outline" class="filter-icon-remove"></ion-icon> <ion-label class="filter-added">Filter à été bien supprimer</ion-label></div>',
      showCancelButton: false,
      confirmButtonText: 'Fermer',
      position:'bottom',
      showClass: {
        popup: 'animate__animated animate__slideInUp animate__faster remove-filter '
      },
      hideClass: {
        popup: 'animate__animated animate__slideOutDown remove-filter'
      }
    });
    this.ngOnInit();
  }

}
