import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfilePage {
  user: any;
  uploadedImage: string;
  constructor(
    private platform: Platform, 
    private statusBar: StatusBar, 
    private router: Router, 
    private alertController : AlertController) {
   }

  ngOnInit() {
    this.initializeApp();
    this.user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.uploadedImage = this.user.image ?? "assets/img/profile.png";
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        this.statusBar.overlaysWebView(true);
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#00FFFFFF');
      }
      
    });
  }

  async deconnecter() {
    const alert = await this.alertController.create({
      message: 'Etes vous sur vous voulez se deconecter?',
      cssClass: 'deconnexion-confirmation',
      buttons: [
        {
          text: 'Annuler',
          cssClass: 'alert-button-cancel',
          role: 'Annuler'
        },
        {
          text: 'Se deconnecter',
          cssClass: 'alert-button-confirm',
          handler: () => {
            // Call the method to delete the record
            localStorage.setItem('currentUser', '');
            this.router.navigateByUrl('/apps/tabs/schedule');
            
          }
        }
      ]
    });
  
    await alert.present();
    
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
}
