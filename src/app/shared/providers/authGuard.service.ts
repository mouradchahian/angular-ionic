import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router, 
    private toastService: ToastService) {}

  async canActivate(): Promise<boolean> {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      // The user is logged in, allow access to the route
      return;
    } else {
      // The user is not logged in, redirect to the login page
      this.router.navigate(['/apps/tabs/schedule']);
      this.toastService.showError('Vos identifiants ne sont pas valide!!!');
      return false;
    }
  }
}