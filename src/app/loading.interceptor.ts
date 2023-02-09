import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { LoadingSpinnerService } from './loading-spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(public spinnerService: LoadingSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // show the spinner before handling request
    this.spinnerService.show();

    // hide spinner when response or error is received
    return next.handle(request)
    .pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.spinnerService.hide();
      }
    }, (error) => {
      this.spinnerService.hide();
    }));
  }
}
