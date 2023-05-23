import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOptions } from '../../interfaces/user-options';
import {
  AlertController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { UserService } from '../../service/user.service';
import { LoginPage } from '../login/login';
import { Plugins } from '@capacitor/core';
const { Keyboard } = Plugins;

import { PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterPage implements OnInit {
  login: UserOptions = { username: '', password: '' };
  submitted: boolean = false;
  registerForm: FormGroup;
  token: string;
  constructor(
    private router: Router,
    private modalController: ModalController,
    private userService: UserService,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getToken();
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      token: [this.token],
      role: ['user'],
    });
  }

  ngAfterViewInit() {
    Keyboard.addListener('keyboardWillShow', (info) => {
      document.body.classList.add('keyboard-is-open');
      document.documentElement.style.setProperty(
        '--keyboard-height',
        -info.keyboardHeight + 'px'
      );
    });
    Keyboard.addListener('keyboardDidShow', (info) => {
      document.activeElement.scrollIntoView({ behavior: 'smooth' });
      document.documentElement.style.setProperty(
        '--keyboard-height',
        -info.keyboardHeight + 'px'
      );
    });
    Keyboard.addListener('keyboardWillHide', (info) => {
      document.body.classList.remove('keyboard-is-open');
    });
  }
  async onLogin() {
    if (this.registerForm.valid) {
      this.userService
        .findUser(this.registerForm.get('email').getRawValue())
        .subscribe(async (response) => {
          let body = JSON.parse(JSON.stringify(response));
          if (body.length) {
            const toast = await this.toastCtrl.create({
              message: 'Ce compte exist déjà!!!',
              duration: 3000,
              cssClass: 'warning-toast top-15',
              color: 'warning',
              icon: 'warning',
              position: 'top',
            });

            toast.present();
            return;
          } else {
            this.createAccount();
          }
        });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: {
        navCtrl: this.navCtrl,
      },
    });
    await modal.present();
  }

  async getToken() {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    await PushNotifications.addListener('registration', (token: Token) => {
      this.token = token.value;
    });
  }

  createAccount() {
    this.registerForm.get('token').setValue(this.token);
    const registerData = this.registerForm.value;
    this.userService.addUser(registerData).subscribe(
      async (response) => {
        console.log('User added successfully:', response);
        const alert = await this.alertController.create({
          header: 'Success',
          message: "L'utilisateur a été crée successfully !!!",
          buttons: ['OK'],
          cssClass: 'success',
        });
        await alert.present();
        this.registerForm.reset();
        this.dismiss();
        //this.sendNotification();
      },
      (error) => {
        console.error('Error adding reservation:', error);
      }
    );
  }
}
