import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private alertController: AlertController
  ) {}

  user: any;
  items: any[] = [];
  @ViewChild(IonItemSliding) slidingItem: IonItemSliding;
  ngOnInit() {
    this.user = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : '';
    this.getNotifcations();
  }

  back() {
    this.router.navigate(['/apps/tabs/profile']);
  }

  async deleteItem(item, itemT: IonItemSliding) {
    const alert = await this.alertController.create({
      header: 'Suppression confirmation',
      message: 'Etes vous sur vous voulez supprimer cette notification?',
      cssClass: 'supp-confirmation',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            itemT.close();
            this.slidingItem.close();
          },
        },
        {
          text: 'Supprimer',
          handler: () => {
            // Call the method to delete the record
            this.notificationService.delete(item.id).subscribe((respose) => {
              const index = this.items.indexOf(item);
              this.items.splice(index, 1);
              itemT.close();
              this.slidingItem.close();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  handleRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 500);
  }

  getNotifcations() {
    this.notificationService
      .findNotificationById(this.user.token, this.user.role)
      .subscribe(async (response) => {
        let body = JSON.parse(JSON.stringify(response));
        if (body.length) {
          this.items = body;
        }
      });
  }
}
