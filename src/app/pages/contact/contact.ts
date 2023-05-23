import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Platform, ToastController } from '@ionic/angular';

import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';


@Component({
  selector: 'app-contactT',
  templateUrl: 'contact.html',
  styleUrls: ['./contact.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactPage {

  contactForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private platform: Platform, private http: HttpClient, private toastController: ToastController, private backgroundMode: BackgroundMode, private statusBar: StatusBar) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.platform.ready().then(() => {
      // let status bar overlay webview
      this.statusBar.overlaysWebView(true);
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#00FFFFFF');
      
    });
    
    
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      const formData = new FormData();
      formData.append('name', this.contactForm.value.name);
      formData.append('email', this.contactForm.value.email);
      formData.append('message', this.contactForm.value.message);
      this.http.post('https://example.com/contact', formData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }



}
