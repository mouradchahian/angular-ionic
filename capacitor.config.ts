import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jidorcar.mohamed',
  appName: 'jidorCar',
  webDir: 'www',
  bundledWebRuntime: false,
  backgroundColor:"#1b6dc1",
  android:{
    backgroundColor:"#1b6dc1",
    allowMixedContent:true
  },
  plugins: {
    LocalNotifications:{
      iconColor:'#FF7F50'
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER",
      showSpinner: false,
      splashFullScreen: false,
      splashImmersive: false,
    }
  }
};

export default config;
