import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AnswerService {

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
    options.params = data;
    
    return this.http.get(this.route + '/answer', options);
  }

  getById(id: number) {
    const options = this.getOptions();

    return this.http.get(this.route + `/answer/${id}`, options);
  }

  create(data: any) {
    const options = this.getOptions();

    return this.http.post(this.route + '/answer', data, options);
  }
}
