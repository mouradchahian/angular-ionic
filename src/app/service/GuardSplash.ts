import { Resolve, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';


export class GuardSplash implements CanActivate {
    constructor(
    ) {}
    canActivate(route: ActivatedRouteSnapshot):  Promise<boolean>
    {
      return new Promise(resolve => {
            SplashScreen.hide();

            // Show the splash for an indefinite amount of time:
            SplashScreen.show({
            autoHide: false,
            });
            
            // Show the splash for two seconds and then automatically hide it:
            SplashScreen.show({
            showDuration: 2000,
            autoHide: true,
            });
            resolve(true);
      });
    }
  }