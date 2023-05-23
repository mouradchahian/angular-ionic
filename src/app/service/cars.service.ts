import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

//For all service im not using the entities as return 
//because it's just a demo with json server this is gonna be availible in next release
export class CarsService {

  apiUrl: string = environment.url;
  
  constructor(private http: HttpClient) { }

  public findCars(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/cars?_embed=reservations`);
  }

  public findCarsById(id): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/cars/${id}`);
  }

  //this is because im using just json server it's just a demo version 
  //also i've learnt how to use the pipe
  //this is one of diffrences between promise and Observable
  public findCarsByReservation(start, end): Observable<any>
  {
    const savedFilterOptions = localStorage.getItem('savedFilterOptions');
    const filters = savedFilterOptions ? JSON.parse(savedFilterOptions) : [];
    return this.http.get(`${this.apiUrl}/cars?order=asc&_embed=reservations`).pipe(
      map((cars: any[]) => cars.filter(car => {

        if(filters && filters.length != 0){
          let filterBrand = filters.brand.includes(car.brand);
          let filterFeature = filters.feature.some(r=> car.feature.includes(r));
          let filterType = filters.fuelType.includes(car.type);
          if(filters.brand.length > 0 && !filterBrand)
          {
            return false;
          }
          else if(filters.feature.length > 0 && !filterFeature){
            return false;
          }
          else if(filters.fuelType.length > 0 && !filterType){
            return false;
          }
        }
        
        car.reservations =  car.reservations.filter(reservation => reservation.active);
        const reservation = car.reservations[0];
        let last = car.reservations?.[car.reservations.length-1];
        if (!reservation) {
          return true;
        }
          let startDate:any = new Date(reservation.start);
          let endDate :any = new Date(last.end);

          if(formatDate(new Date(), "yyyy-MM-dd", "fr-FR") > formatDate(endDate, "yyyy-MM-dd", "fr-FR")){
            return true;
          }

          car.reservations.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

          // create a new list for available intervals
          let availableIntervals = [];

          // loop through sorted reservations and find available intervals
          for (let i = 1; i < car.reservations.length; i++) {
            let current = car.reservations[i];
            let next = car.reservations[i - 1];
            if (new Date(current.start) > new Date(next.end) && ((new Date(current.start).getTime() - new Date(next.end).getTime()) != 86400000) && (new Date(start) > new Date(next.end) && new Date(end) < new Date(current.start))) {
              // there is an available interval between current and next
              availableIntervals.push({
                startDate: next.end,
                endDate: current.start
              });
            }
          }
          return (start < startDate && end < startDate) || (start > endDate && end > endDate) || availableIntervals.length > 0;
      }))
    );
  }

  public findCarsByReservationAndId(id): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/cars/${id}?order=asc&_embed=reservations`)
    
  }

  public getCars(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/cars`);
  }

  public add(car): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/cars`, car);
  }

  edit(id: number, car): Observable<any> {
    return this.http.patch(`${this.apiUrl}/cars/${id}`, car);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cars/${id}`);
  }
}
