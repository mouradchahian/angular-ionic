import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { LoginPage } from '../login/login';
import { Router } from '@angular/router';
@Component({
  templateUrl: 'tabs-page.html',
  styleUrls: ['./tabs-page.scss']
})
export class TabsPage {

  public constructor(private router: Router,private modalController:ModalController, private navCtrl:NavController){
    
  }

  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      componentProps: {
        navCtrl: this.navCtrl
      }
    });
    await modal.present();
  }

  async openLoginModal(){
    let user = localStorage.getItem("currentUser");
    if(!user){
      const modal = await this.modalController.create({
        component: LoginPage,
        componentProps: {
          navCtrl: this.navCtrl
        }
      });
      await modal.present();
    }else{
      this.router.navigate(['/apps/tabs/profile']);
    }
    
  }
}
