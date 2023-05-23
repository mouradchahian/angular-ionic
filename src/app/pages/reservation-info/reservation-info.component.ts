import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-info',
  templateUrl: './reservation-info.component.html',
  styleUrls: ['./reservation-info.component.scss'],
})
export class ReservationInfoComponent  implements OnInit {
  @Input() item: any;
  constructor(private callNumber: CallNumber, private iab: InAppBrowser,private modalController: ModalController, private alertController: AlertController, private androidPermissions: AndroidPermissions) { }

  ngOnInit() {
    console.log(this.item)
  }

  closeModal() {
    this.modalController.dismiss();
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



  async openDialer(url: string) {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CALL_PHONE)
      .then(async (result) => {
        if (result.hasPermission) {
          // Permission granted, we can access contacts
          //alert('Call phone');
          //const phoneNumber = '1234567890';
          //const telUrl = `tel:${phoneNumber}`;
          //this.iab.create(telUrl, '_system');
          this.doCall(url);
          
        } else {
          // Permission not granted, request it
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CALL_PHONE)
            .then(async (response) => {
              if (response.hasPermission) {
                // Permission granted, we can access contacts
                this.doCall(url);
              } else {
                // Permission denied, show error message
                console.log('Read Contacts permission denied');
              }
            });
        }
      });
  }

  async doCall(url)
  {
    await Swal.fire({
      title: '',
      html:'<ion-icon name="call" class="make-call"></ion-icon><ion-label>Vous voulez vraiment passer l\'appel ?</ion-label>',
      showCancelButton: true,
      confirmButtonText: 'Appeler',
      cancelButtonText:'Annulé',
      position:'bottom',
      showClass: {
        popup: 'animate__animated animate__slideInUp animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__slideOutDown'
      }
    }).then((result) => {

      if (result.isConfirmed)
      {
        this.callNumber.callNumber(url, false)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => alert('Error launching dialer'+err));
      }

    })
  }
}
