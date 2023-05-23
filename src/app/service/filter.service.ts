import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//For all service im not using the entities as return 
//because it's just a demo with json server this is gonna be availible in next release
export class FilterService {

  apiUrl: string = environment.url;

  constructor(private http: HttpClient) { }

  public getBrands(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/brands`)
  }

  public getFuelTypes(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/fuelTypes`)
  }

  public getFeatures(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/features`)
  }

}
