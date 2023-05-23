import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactPageRoutingModule } from './contact-routing.module';
import { ContactPage } from './contact';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ContactPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ContactPage],
    bootstrap: [ContactPage],
    providers: [
        StatusBar,
        BackgroundMode
      ]
})
export class ContactModule {}
