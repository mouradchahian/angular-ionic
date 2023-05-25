import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOptions } from '../../shared/interfaces/user-options';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { UserService } from '../../shared/services/user.service';
import { RegisterPage } from '../register/register';

import { Plugins } from '@capacitor/core';
const {  Keyboard } = Plugins;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit{
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  userForm: FormGroup;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private userService: UserService,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit(){
    Keyboard.addListener('keyboardWillShow', (info) => {
      document.body.classList.add('keyboard-is-open');
      document.documentElement.style.setProperty('--keyboard-height', - info.keyboardHeight + 'px');
    });
    Keyboard.addListener('keyboardDidShow', (info) => {
      document.activeElement.scrollIntoView({behavior: 'smooth'});
      document.documentElement.style.setProperty('--keyboard-height', - info.keyboardHeight + 'px');
    });  
    Keyboard.addListener('keyboardWillHide', (info) => {
      document.body.classList.remove('keyboard-is-open');
    });     
  }

  async onLogin() {
    let username = this.userForm.value.username;
    let password = this.userForm.value.password;
    this.userService.login(username, password)
    .subscribe(async response => {
      let body = JSON.parse(JSON.stringify(response));
      if(body.length){
        const toast = await this.toastCtrl.create({
          message: 'Vous êtes connectés',
          duration: 2000,
          cssClass: 'success-toast',
          color:'success',
          icon:'checkmark-circle',
          position:'top'
        });
      
        toast.present();

        localStorage.setItem('currentUser', JSON.stringify(body[0]));
    
        this.router.navigateByUrl('/apps/tabs/profile');
        setTimeout(() =>{
          this.modalController.dismiss();
        }, 1000)
        
      }else{
        const toast = await this.toastCtrl.create({
          message: 'Vos identifiants ne sont pas valide!!!',
          duration: 3000,
          cssClass: 'warning-toast top-15',
          color:'warning',
          icon:'warning',
          position:'top'
        });
      
        toast.present();
        return;
      }


    }, error => {
      console.error('Error login:', error);
    });


    /*if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    }*/
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async openRegisterModal(){
    const modal = await this.modalController.create({
      component: RegisterPage,
      componentProps: {
        navCtrl: this.navCtrl
      }
    });
    await modal.present();
  }


}
