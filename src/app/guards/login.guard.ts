import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
  ) {}

  public canActivate(): any {
    return this.validateSession();
  }

  validateSession() {
    return new Promise((success) => {
      const token: string | null = localStorage.getItem('auth-token');

      if (token == undefined || token == null || token == '') {
        success(true);
      } else {
        this.router.navigate(['/survey']);
        success(false);
      }
    });
  }
}
