import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule, Platform } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'ion2-calendar';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ErrorIntercept } from './shared/providers/error.interceptor';
registerLocaleData(localeFr);
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicModule,
    CalendarModule.forRoot({
      closeIcon: true,
    }),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  declarations: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true,
      deps:[AlertController]
    },
    InAppBrowser,
    Camera,
    File,
    FileTransfer,
    FileTransferObject,
    Keyboard,
    FCM,
    BackgroundMode,
    Firebase,
    CallNumber,
    AndroidPermissions,
    Storage,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private platform: Platform) {
    if (this.platform.is('hybrid')) {
      SplashScreen.hide();

      StatusBar.setStyle({ style: Style.Dark });
      // Show the splash for an indefinite amount of time:
      SplashScreen.show({
        autoHide: false,
      });

      // Show the splash for two seconds and then automatically hide it:
      SplashScreen.show({
        showDuration: 2000,
        autoHide: true,
      });
    }
  }
}
