import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})

//For all service im not using the entities as return 
//because it's just a demo with json server this is gonna be availible in next release
export class ReservationService {
  apiUrl: string = environment.url;
  constructor(private http: HttpClient) { }

  public addReservation(data): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/reservations`, data);
  }

  //this is because im using just json server it's just a demo version 
  //also i've learnt how to use the pipe
  //this is one of diffrences between promise and Observable
  public findReservations(username): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/reservations?_embed=cars&email=${username}`).pipe(
      switchMap((reservations: any[]) => {
        const carObservables = reservations.map(reservation => this.http.get(`${this.apiUrl}/cars/${reservation.carId}`));
        return forkJoin(carObservables).pipe(
          map((cars: any[]) => {
            return reservations.map((reservation, index) => {
              return { ...reservation, car: cars[index] };
            });
          })
        );
      })
    );
  }

  //this is because im using just json server it's just a demo version 
  //also i've learnt how to use the pipe
  //this is one of diffrences between promise and Observable
  public findReservationsAll(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/reservations?_embed=cars`).pipe(
      switchMap((reservations: any[]) => {
        const carObservables = reservations.map(reservation => this.http.get(`${this.apiUrl}/cars/${reservation.carId}`));
        return forkJoin(carObservables).pipe(
          map((cars: any[]) => {
            return reservations.map((reservation, index) => {
              return { ...reservation, car: cars[index] };
            });
          })
        );
      })
    );
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservations/${id}`);
  }

  updateReservationActive(reservationId: number, status: boolean, text: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/reservations/${reservationId}`, { active: status, status: text });
  }
}
