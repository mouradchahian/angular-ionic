import { Capacitor } from '@capacitor/core';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { FilesystemDirectory, Directory } from '@capacitor/filesystem';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Keyboard } = Plugins;
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent  implements OnInit {
  directory = FilesystemDirectory.Data;
  uploadedImage: string;
  user;
  updateUserForm: FormGroup;
  constructor(
    private file: File,
    private fileTransfer: FileTransfer,
    private platform: Platform,
    private fb: FormBuilder,
    private userService:UserService,
    private alertController: AlertController,
    private router: Router
    ) {
     }

  ngOnInit() {
    this.initializeApp();
    this.user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.uploadedImage = this.user.image ?? "assets/img/profile.png";
    this.updateUserForm = this.fb.group({
      id: [this.user.id ?? '', Validators.required],
      nom: [this.user.nom ?? '', Validators.required],
      prenom: [this.user.prenom ?? '', Validators.required],
      email: [this.user.email ?? '', Validators.required],
      tel: [this.user.tel ?? '', Validators.required],
      password: [this.user.password ?? '', Validators.required],
      token: [this.user.token ?? '', Validators.required],
      image:[this.uploadedImage],
      role:[this.user.role]
    });
  }

  ngAfterViewInit(){
       
  }

  back(){
    //apps/tabs/profile
    this.router.navigate(['/apps/tabs/profile']);
    //this._location.back();
  }

 
  
  async  captureAndUpload() {
    // Use the Camera plugin to capture an image
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    const fileName = new Date().getTime() + '.jpeg';

    // Save the photo to the app's private storage directory
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: image.base64String,
      directory: Directory.Data
    });
    const imageUrl = Capacitor.convertFileSrc(savedFile.uri);
    this.uploadedImage = imageUrl;
  }

  downloadAndSaveImage(url: string): Promise<string> {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileName = `${new Date().getTime()}.jpg`;
    const filePath = this.file.dataDirectory + fileName;
    
    return fileTransfer.download(url, filePath).then(() => {
      return filePath;
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        // set status bar to white
        StatusBar.setBackgroundColor({color:'#ff000000'}); 
        //this.statusBar.backgroundColorByHexString('var(--theme-color)');
      }
      
    });
  }
  async onUpdate(){
    if(this.updateUserForm.valid){
      this.updateUserForm.get('image').setValue(this.uploadedImage);
      this.userService.updateUser(this.updateUserForm.value).subscribe(
        async user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Votre Profile est modifié avec success !!!',
            buttons: ['OK'],
            cssClass:'success'
          });
          await alert.present();
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

}
