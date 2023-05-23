import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public toastCtrl: ToastController) {}

  async canActivate(): Promise<boolean> {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      // The user is logged in, allow access to the route
      return;
    } else {
      // The user is not logged in, redirect to the login page
      this.router.navigate(['/apps/tabs/schedule']);
      const toast = await this.toastCtrl.create({
        message: 'Vos identifiants ne sont pas valide!!!',
        duration: 3000,
        cssClass: 'warning-toast',
        color:'warning',
        icon:'warning'
      });
    
      toast.present();
      return false;
    }
  }
}