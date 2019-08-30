import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import {throwError as observableThrowError,  Observable, of, Subject, from } from 'rxjs';
import { catchError ,  map, flatMap,retryWhen, take, delay, switchMap} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAuthHeader(request);

    return next.handle(request)
    .pipe(
    
        catchError((err: Response) => {
            if (err.status === 401) {
                 return from(this.authenticationService.load()).pipe(
                 switchMap((params: any) => {
                    request = this.addAuthHeader(request);
                     return next.handle(request);
                 }),
                 catchError(() => {
                          return observableThrowError(err);
                  })
                 );
            }
            else
                return observableThrowError(err);
          })
    )
  }

  private addAuthHeader(req: HttpRequest<any>) : HttpRequest<any>
  {
     return req.clone({
         setHeaders: {
           'Authorization': `Bearer ${this.authenticationService.accessToken}`,
         }
       });
  }

}