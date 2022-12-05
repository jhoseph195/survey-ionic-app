import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.validateSession();
  }

  validateSession() {
    return new Promise((success) => {
      const token: string | null = localStorage.getItem('auth-token');

      if (token == undefined || token == null || token == '') {
        this.router.navigate(['/login']);
        success(false);
      } else {
        success(true);
      }
    });
  }
}
