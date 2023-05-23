import { SplashScreen } from '@capacitor/splash-screen';
import { NavigationBarPlugin } from 'capacitor-navigationbar';
import { Plugins } from '@capacitor/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  loading:boolean = true;
  NavigationBar = Plugins.NavigationBar as NavigationBarPlugin;
  constructor(
    private platform: Platform,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    //this.sendNotification('', '');
    await this.storage.create();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      setTimeout(() => {
        if (this.platform.is('hybrid')) {
          StatusBar.setOverlaysWebView({ overlay: true });
          StatusBar.setBackgroundColor({ color: '#ff000000' });
          //StatusBar.setStyle({ style: Style.Dark });
          this.NavigationBar.setBackgroundColor({ color: '#ffffff' });
          this.loading = false;
          SplashScreen.hide(); 
        }
      }, 1500);

      //if (this.platform.is('hybrid')) {
        //StatusBar.setBackgroundColor({color:'var(--theme-color)'});
        //this.backgroundMode.enable();
        /*const channel: Channel = {
          id: 'my-channel3',
          name: 'my channel',
          description: 'My channel description',
          importance: 4,
          sound: 'beep.wav',
          visibility: 1
        };
        LocalNotifications.createChannel(channel).then(() => {
          console.log('Channel created');
        }).catch((error) => {
          console.log('Error creating channel', error);
        });*/
        /*setInterval(() => {
          let not={
            notifications: [{
              title: 'hhhMy Notification hh',
              body: 'This is my notification',
              smallIcon:"res://drawable/icons8_car_50", 
              largeIcon: 'res://drawable/splash',
              iconColor:'var(--theme-color)',
              groupSummary: false,
              id: 7,
              channelId: 'my-channel3',
              showWhen: true,
              vibrate: true,
            }]
          };
          LocalNotifications.schedule(not);
         }, 50000000000000000000) */
      //}
    });
  }
}
