import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterPage,
  ]
})
export class RegisterModule { }
