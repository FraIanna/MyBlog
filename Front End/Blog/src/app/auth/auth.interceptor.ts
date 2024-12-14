import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authSvc: AuthService,
    private spinnerSvc: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessData = this.authSvc.getAccessData();

    if (accessData) {
      const newReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessData.token}`,
        },
      });

      this.spinnerSvc.show();

      return next.handle(newReq).pipe(
        catchError((error: HttpErrorResponse) => {
          this.authSvc.logout();
          return throwError(() => new Error(error.message));
        }),
        finalize(() => {
          this.spinnerSvc.hide;
        })
      );
    }

    return next.handle(request);
  }
}
