import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

//For all service im not using the entities as return 
//because it's just a demo with json server this is gonna be availible in next release
export class UserService {

  apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  public login(username:string, password:string): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/user?email=${username}&password=${password}`);
  }

  public addUser(data): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/user`, data);
  }

  public findUser(username): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/user?email=${username}`);
  }

  public findRole(role): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/user?role=${role}`);
  }


  updateUser(user): Observable<any> {
    const url = `${this.apiUrl}/user/${user.id}`;
    return this.http.put(url, user);
  }
}
