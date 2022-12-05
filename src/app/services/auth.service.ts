import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CapacitorHttp } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public route = environment.baseUrl;
  public httpOptions = {
    headers: { 'Content-Type': 'application/json'}
  };

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      })
    };
  }

  login(data: any) {
    const options = this.getOptions();

    return this.http.post(this.route + '/auth/login', data, options);
  }
  
  logout() {
    const options = this.getOptions();

    return this.http.post(this.route + '/auth/logout', {}, options);
  }
}
