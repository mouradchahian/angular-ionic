import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { AlertController, IonItemSliding, ModalController, Platform } from '@ionic/angular';
import { ReservationService } from '../../shared/services/reservation.service';
import { ReservationInfoComponent } from '../reservation-info/reservation-info.component';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent  implements OnInit {

  constructor(
    private userService:UserService,
    private notification: NotificationService, 
    private router: Router,
    private alertController: AlertController,
    private platform: Platform,
    private reservationService:ReservationService, 
    private modalController: ModalController
  ) { }
  content:boolean = false;
  user:any;
  items: any[] = [
  ];
  token: string;
  uploadedImage: string;
  today: any[];
  all: any[];
  role: string;
  segement:string = "today";
  @ViewChild(IonItemSliding) slidingItem: IonItemSliding;

  async ngOnInit() {
    this.initializeApp();
    this.user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.uploadedImage = this.user.image ?? "assets/img/profile.png";
    this.role = this.user.role;
    if(this.user.role == 'admin'){
      this.getAllReservations();
    }else{
      this.getReservationsByEmail();
    }
  }


  async deleteItem(item, itemT: IonItemSliding) {
    const alert = await this.alertController.create({
      header: 'Suppression confirmation',
      message: 'Etes vous sur vous voulez supprimer cette reservation?',
      cssClass: 'supp-confirmation',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            itemT.close();
            this.slidingItem.close();
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            // Call the method to delete the record
            this.reservationService.deleteReservation(item.id).subscribe(respose => {
              this.userService.findUser(item.email).subscribe((user : any) => {
                this.notification.add({'title':'Votre reservation ('+ item.car.title +') à été supprimer !!!' , 'created': new Date(), 'idAppUser': user[0].token, 'role':'user'}).subscribe((response) => {
                  this.sendNotification(user[0].token, 'Votre Réservation à été supprimer ', 'Votre reservation ('+ item.car.title +') à été supprimer');
                  return true;
                })
              })
              const index = this.items.indexOf(item);
              this.items.splice(index, 1);
              itemT.close();
              this.slidingItem.close();
            })
            
          }
        }
      ]
    });
  
    await alert.present();
    
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

  back(){
    this.router.navigate(['/apps/tabs/profile']);
  }


  getStatusIcon(status: string): string {
    switch (status) {
      case 'En cours':
        return 'time-outline';
      case 'Active':
        return 'checkmark-outline';
      case 'Rejected':
        return 'close-outline';
      default:
        return '';
    }
  }



  async changeStatus(item, active, text, itemT: IonItemSliding) {
    let header;
    let message;
    let button;
    if(active){
      header = 'Activation confirmation';
      message = 'Etes vous sur vous voulez activé cette reservation?';
      button = 'Activer'
    }else{
      header = 'Désactivation confirmation';
      message = 'Etes vous sur vous voulez désactivé cette reservation?';
      button = 'Désactiver'
    }
    const alert = await this.alertController.create({
      header: header,
      message: message,
      cssClass: 'supp-confirmation',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.slidingItem.close();
            itemT.close();
          }
        },
        {
          text: button,
          handler: () => {
            // Call the method to delete the record
            this.reservationService.updateReservationActive(item.id, active, text).subscribe(respose => {
              const index = this.items.indexOf(item);
              this.items[index].status = text;
              this.items[index].active = active;
              let statusRes;
              if(active){
                statusRes = "Activé"
              }else{
                statusRes = "Désactivé"
              }
              this.userService.findUser(item.email).subscribe((user : any) => {
                this.notification.add({'title':'Votre reservation ('+ item.car.title +') à été ' + statusRes , 'created': new Date(), 'idAppUser': user[0].token, 'role':'user'}).subscribe((response) => {
                  this.sendNotification(user[0].token, 'Votre Réservation à été modifier ', 'Votre reservation ('+ item.car.title +') à été ' + statusRes);
                  return true;
                })
              })
              this.slidingItem.close();
              itemT.close();
            })
            
          }
        }
      ]
    });
  
    await alert.present();
  }

  async showClientInfo(clientInfo) {
    const modal = await this.modalController.create({
      component: ReservationInfoComponent,
      componentProps:{
        item: clientInfo
      }
    });
    await modal.present();
    const detail: any = await modal.onDidDismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  handleRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  todayReservation(){
    this.content = false;
    setTimeout(() => {
      this.items = this.today;
      this.content = true;
    }, 500);
  }

  allReservation(){
    this.content = false;
    setTimeout(() => {
     this.items = this.all;
     this.content = true;
    }, 500);
  }

  segmentChanged(event: any) {
    this.segement = event.detail.value;
    this.ngOnInit();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  //this should be in service 
  //this because it's not complete yet
  // i need to configure on backend side using fcm 
  // this should be on next release
  sendNotification(token, title, text) {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      this.token=token.value;
      //alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      //alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        //alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
        this.router.navigateByUrl("/user/reservation");
      },
    );
    // Send the message
    let message = {
      "to": token,
      "notification": {
        "title": title,
        "body": text,
        "mutable_content": true,
        "sound": "Tri-tone"
      }
  };
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAqwBNQjc:APA91bGGWx-Zw6-rDew7mUHuyxZy6c8tdhYQ0kJ7PLVmKokGxSiFZLev9Ec3oHv1mtXO3XFeV9TRgRq32e5NNseW85B62-phs4qxoNFdT0M5DuTXYQs6pRUry6VhQvSeJwNxB4NLypsu',
      },
      body: JSON.stringify(message),
    })
      .then(() => {
      })
      .catch((error) => (this.token = error));
      
  }

  //this should be updated
  //on backend side by role
  getAllReservations()
  {
    this.reservationService.findReservationsAll()
      .subscribe(async response => {
        let body = JSON.parse(JSON.stringify(response));
        if(body.length){
          if(this.segement == "today"){
            this.items = body.filter(reservation => formatDate((new Date(reservation.creation)), "yyyy-MM-dd", "fr-FR") === formatDate((new Date()), "yyyy-MM-dd", "fr-FR"));
          }else{
            this.items = body;
          }
            
            this.today = body.filter(reservation => formatDate((new Date(reservation.creation)), "yyyy-MM-dd", "fr-FR") === formatDate((new Date()), "yyyy-MM-dd", "fr-FR"));
            this.all = body;
        }
        setTimeout(() => {
          this.content = true;
          }, 500);
      });
  }

  //this should be updated
  //on backend side by role
  getReservationsByEmail()
  {
    this.reservationService.findReservations(this.user.email ?? '')
      .subscribe(async response => {
        let body = JSON.parse(JSON.stringify(response));
        if(body.length){
          if(this.segement == "today"){
            this.items = body.filter(reservation => formatDate((new Date(reservation.creation)), "yyyy-MM-dd", "fr-FR") === formatDate((new Date()), "yyyy-MM-dd", "fr-FR"));
          }else{
            this.items = body;
          }
            
            this.today = body.filter(reservation => formatDate((new Date(reservation.creation)), "yyyy-MM-dd", "fr-FR") === formatDate((new Date()), "yyyy-MM-dd", "fr-FR"));
            this.all = body;
        }
        setTimeout(() => {
          this.content = true;
          }, 500);
      });
  }
}
