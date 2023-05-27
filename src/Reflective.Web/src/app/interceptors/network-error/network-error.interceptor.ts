import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Constants from 'src/app/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { NetworkErrorPopupComponent } from 'src/app/components/network-error-popup/network-error-popup.component';

@Injectable()
export class NetworkErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const observer = {
      error: (err: HttpErrorResponse) => {
        if (err.status == 0 && this.route.firstChild?.component != NetworkErrorPopupComponent) {
          let navParams: Params = {};
          navParams[Constants.returnUrlParam] = this.router.url;
          this.router.navigate(["/network-error", navParams]);
        }
      }
    }

    return next.handle(request).pipe(tap(observer));
  }
}