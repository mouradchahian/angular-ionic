import { Component } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };

  constructor(public popoverCtrl: PopoverController, private platform: Platform, private statusBar: StatusBar) {
    this.initializeApp();
   }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }

  async ngOnInit() {
    this.initializeApp();

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
}
