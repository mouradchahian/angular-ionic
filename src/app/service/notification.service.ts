import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//For all service im not using the entities as return 
//because it's just a demo with json server this is gonna be availible in next release
export class NotificationService {
  
  apiUrl: string = environment.url;

  constructor(private http:HttpClient) { }

  public findNotificationById(token, role): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/notification/?idAppUser=${token}&role=${role}&_sort=id&_order=desc`);
  }

  public add(notification): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/notification`, notification);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notification/${id}`);
  }
}
