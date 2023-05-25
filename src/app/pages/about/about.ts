import { Component } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {

  constructor(public popoverCtrl: PopoverController, private platform: Platform, private statusBar: StatusBar) {
    this.initializeApp();
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
