import { customCalendar } from '../../shared/services/customCalendar';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../shared/services/reservation.service';
import { CalendarResult } from 'ion2-calendar';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { CarsService } from '../../shared/services/cars.service';
import Swal from 'sweetalert2';
import { FilterService } from '../../shared/services/filter.service';
import { NotificationService } from '../../shared/services/notification.service';
import { UserService } from '../../shared/services/user.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'cars-detail',
  templateUrl: 'cars-detail.html',
  styleUrls: ['./cars-detail.scss'],
})
export class CarsDetailPage implements OnInit {
  @Input() title: any;
  @Input() label: any;
  @Input() car: any;
  @Input() dateOriginal: any;
  token: string;
  user: any;
  reservationForm: FormGroup;
  types: any[];
  constructor(
    public loadingCtrl: LoadingController,
    private modalController: ModalController,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private alertController: AlertController,
    public modalCtrl: ModalController,
    private renderer: Renderer2,
    private router: Router,
    private cars: CarsService,
    private filter: FilterService,
    private notification: NotificationService,
    private userService: UserService,
    private customCalendar: customCalendar
  ) {}

  async ngOnInit() {
    this.getType();
    this.user = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : '';
    this.reservationForm = this.fb.group({
      nom: [this.user.nom ?? '', Validators.required],
      prenom: [this.user.prenom ?? '', Validators.required],
      email: [this.user.email ?? '', [Validators.required, Validators.email]],
      tel: [this.user.tel ?? '', Validators.required],
      lieu: [this.title ?? '', Validators.required],
      date: [this.label ?? '', Validators.required],
      start: [this.dateOriginal?.from?.string ?? ''],
      end: [this.dateOriginal?.to?.string ?? ''],
      carId: [this.car.id ?? ''],
      description: [''],
      status: ['En cours'],
      creation: [new Date()],
      active: [false],
    });
  }

  ngAfterViewChecked() {
    var appl = document.querySelector('.buttons-last-slot');
    if (document.querySelector('.new-element') && appl) {
      document.querySelector('.new-element').appendChild(appl);
      this.renderer.listen(appl, 'click', () => {});
    }
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  async reserver() {
    this.cars.findCarsByReservationAndId(this.car.id).subscribe(async (re) => {
      let st = new Date(this.dateOriginal.from.string);
      let en = new Date(this.dateOriginal.to.string);
      let body = JSON.parse(JSON.stringify(re));
      body.reservations = body.reservations.filter(
        (reservation) => reservation.active
      );
      let startDate: any = new Date(body.reservations?.[0]?.start);
      let endDate: any = new Date(
        body.reservations?.[body.reservations.length - 1]?.end
      );

      // create a new list for available intervals
      let availableIntervals = this.getAvailibleSlots(body, st, en);

      if (
        body.reservations.length == 0 ||
        (st < startDate && en < startDate) ||
        (st > endDate && en > endDate) ||
        availableIntervals.length > 0
      ) {
        await this.confirmReservation(body, st, en);
      } else {
        this.alertError(body);
      }
    });
  }
  //this should be in service 
  //this because it's not complete yet
  // i need to configure on backend side using fcm 
  // this should be on next release
  sendNotification(token, url, username) {
    // Send the message
    let message = {
      to: token,
      notification: {
        title: 'Vous avez reçu une nouvelle réservation',
        body: 'Une nouvelle reservation envoyé par ' + username,
        mutable_content: true,
        sound: 'Tri-tone',
      },
    };
    fetch(environment.fcmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'key=' + environment.authorize,
      },
      body: JSON.stringify(message),
    })
      .then(() => {})
      .catch((error) => (this.token = error));
  }

  async openCalendar() {
    await this.customCalendar.openCalendar();
    const date: CalendarResult = this.customCalendar.dateOriginal;
    this.dateOriginal = date;
    const format = 'dd MMM yyyy';
    const myDate = date ? date['from'].string : '';
    const locale = 'fr-FR';
    const from = formatDate(myDate, format, locale);
    const to = formatDate(date['to'].string, format, locale);
    this.reservationForm.get('start').setValue(this.dateOriginal.from.string);
    this.reservationForm.get('end').setValue(this.dateOriginal.to.string);
    this.reservationForm.get('date').setValue(from + ' - ' + to);
  }

  getType() {
    this.filter.getFuelTypes().subscribe(async (response) => {
      let body = JSON.parse(JSON.stringify(response));
      if (body.length) {
        this.types = body;
      }
    });
  }

  findType(type) {
    return this.types ? this.types.find((t) => type === t.id) : '';
  }

  handleRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  getAvailibleSlots(body, start, end) {
    body.reservations.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    // create a new list for available intervals
    let availableIntervals = [];

    // loop through sorted reservations and find available intervals
    for (let i = 1; i < body.reservations.length; i++) {
      let current = body.reservations[i];
      let next = body.reservations[i - 1];
      if (
        new Date(current.start) > new Date(next.end) &&
        new Date(current.start).getTime() - new Date(next.end).getTime() !=
          86400000 &&
        new Date(start) > new Date(next.end) &&
        new Date(end) < new Date(current.start)
      ) {
        // there is an available interval between current and next
        availableIntervals.push({
          startDate: next.end,
          endDate: current.start,
        });
      }
    }
    return availableIntervals;
  }

  async confirmReservation(body, start, end) {
    const timeDiff = end.getTime() - start.getTime();
    const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    await Swal.fire({
      title: '',
      html:
        '<table class="summary-table"><tr><td><div class="column"><div class="column-label">Prix Réservation:</div></div></td><td><div class="column"><div class="column-value">' +
        body.price +
        ' DH</div></div></td></tr><tr><td><div class="column"><div class="column-label">Nombre jour:</div></div></td><td><div class="column"><div class="column-value">' +
        numberOfDays +
        ' jour</div></div></td></tr><tr><td><div class="column"><div class="column-label">Total Réservation:</div></div></td><td><div class="column"><div class="column-value">' +
        numberOfDays * body.price +
        ' DH</div></div></td></tr></table>',
      showCancelButton: true,
      confirmButtonText: 'Confirmé',
      cancelButtonText: 'Annulé',
      position: 'bottom',
      showClass: {
        popup: 'animate__animated animate__slideInUp animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__slideOutDown',
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const reservationData = this.reservationForm.value;
        this.userService.findRole('admin').subscribe((user: any) => {
          this.sendNotification(
            user[0].token,
            this.car.image,
            reservationData.nom + ' ' + reservationData.prenom
          );
          this.notification
            .add({
              title:
                'Une nouvelle reservation envoyé par ' +
                reservationData.nom +
                ' ' +
                reservationData.prenom,
              created: new Date(),
              idAppUser: user[0].token,
              role: 'admin',
            })
            .subscribe((response) => {
              return true;
            });
        });

        this.reservationService.addReservation(reservationData).subscribe(
          async (response) => {
            const alert = await this.alertController.create({
              header: 'Success',
              message: 'Votre Reservation est envoyée avec success !!!',
              buttons: ['OK'],
              cssClass: 'success',
            });
            await alert.present();
            this.reservationForm.reset();
            this.router.navigateByUrl('/apps/tabs/vehicles');
            this.closeModal();
          },
          (error) => {
            console.error('Error adding reservation:', error);
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  async alertError(body) {
    const styleFOrmat = 'dd MMM yyyy';
    const localeType = 'fr-FR';
    const formatFromRes = formatDate(
      body.reservations?.[0]?.start,
      styleFOrmat,
      localeType
    );
    const formatToRes = formatDate(
      body.reservations?.[body.reservations.length - 1]?.end,
      styleFOrmat,
      localeType
    );
    const alert = await this.alertController.create({
      header: 'Information reservation',
      message:
        'Cette voiture déjà reservé dans cette intervale \n (' +
        formatFromRes +
        ' - ' +
        formatToRes +
        ') !!!',
      cssClass: 'supp-confirmation',
      buttons: ['Ok'],
    });
    await alert.present();
  }
}
