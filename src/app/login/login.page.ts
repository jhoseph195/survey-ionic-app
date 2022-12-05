import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  public clientBgImage = 'url(./assets/images/fondo.jpg)';
  public colorBgImage = 'linear-gradient(to bottom left,#eaeaeaed,#eaeaeaed)';

  public email: string = '';
  public password: string = '';

  ngOnInit() {
  }

  login(){
    const data = {
      email: this.email,
      password: this.password,
      origin: 'APP'
    };

    this.authService.login(data).subscribe((result: any) => {
      localStorage.setItem('auth-token', result.data.token);
      localStorage.setItem('user-id', result.data.id);
      localStorage.setItem('user-name', result.data.name);
      localStorage.setItem('user-type', result.data.type);

      this.router.navigate(['/survey'])
    });
  }
}
 