import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public route = environment.baseUrl;
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      })
    };
  }

  getWithFilters(data: any) {
    const options: any = this.getOptions();
    options.search = data;
    
    return this.http.get(this.route + '/user', options);
  }

  getById(id: number) {
    const options = this.getOptions();

    return this.http.get(this.route + `/user/${id}`, options);
  }

  create(data: any) {
    const options = this.getOptions();

    return this.http.post(this.route + '/user', data, options);
  }

  update(data: any, id: number) {
    const options = this.getOptions();

    return this.http.put(this.route + `/user/${id}`, data, options);
  }

  delete(id: number) {
    const options = this.getOptions();

    return this.http.delete(this.route + `/user/${id}`, options);
  }
}
