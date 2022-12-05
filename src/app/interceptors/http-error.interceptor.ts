import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertController: AlertController
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        finalize(() => { }),
        retry(1),
        catchError((error: HttpErrorResponse) => this.catchError(error))
      );
  }

  async catchError(error: HttpErrorResponse): Promise<any> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(1)

    if ((error.status == 401 || error.status == 403) && window.location.pathname != '/login') {

      console.log(2.1)

      const alert = await this.alertController.create({
        header: 'Alerta',
        subHeader: 'Sesión expirada',
        message: 'Vuelve a ingresar para seguir usando la plataforma',
        buttons: [{
          text: 'OK',
          role: 'confirm',
          handler: () => {
            localStorage.clear();
            window.location.href = '/login';
            return throwError(() => errorMessage);
          },
        }],
      });

      await alert.present();
    } else {
      console.log(2.2)

      const alert = await this.alertController.create({
        message: error.error.message,
        buttons: ['OK'],
      });

      await alert.present();

      return throwError(() => errorMessage);
    }
    console.log(3)

    return throwError(() => errorMessage);
  }
}
