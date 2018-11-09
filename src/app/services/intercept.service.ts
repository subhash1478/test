import { Injectable } from '@angular/core';
import {WebservicesService} from './webservices.service';
import {  HttpEvent,  HttpInterceptor,  HttpHandler,  HttpRequest,  HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  finalize, tap, catchError} from 'rxjs/operators';
import { DataService } from 'src/data.service';
import { Router } from '@angular/router';

@Injectable()
export class InterceptService  implements HttpInterceptor {
  
	constructor(private authService: WebservicesService,private router: Router,  public msg: DataService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.msg.changeMessage('indeterminate');
    
    const started = Date.now();
    
    // modify request
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return next.handle(request)
    .pipe(
      tap(
        (ev: HttpEvent<any>) => {
          if (ev instanceof HttpResponse) {

            const successmsg = ev.body.response;
            this.msg.openSnackBar(successmsg.message);

           
          }
        }
        ),
        catchError(response => {

          if (response instanceof HttpErrorResponse) {
            const ermsg = response.error.response;
            this.msg.openSnackBar(ermsg.message);
            if(ermsg.message=='Invalid Token!'){
              this.router.navigate(['/login']);

            }



          }
          
          return throwError(response);
        }),
        finalize(() => {
          this.msg.changeMessage('determinate');
          
          const elapsed = Date.now() - started;
          const msg = `${request.method} "${request.urlWithParams}"
          in ${elapsed} ms.`;
          
          
        })
        );
      }
    }
    