
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

import { map ,  catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Log} from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor( private http: HttpClient, private authenticationService: AuthenticationService,) { }

  log(log : Log)
  {
    
    return this.http.post<Boolean>(environment.logApi,
      log, {headers: this.authenticationService.GetContentTypeHeaderJson()})
      .pipe(
       map((response: Boolean) => response
     ),
       catchError((err: Response) => {
           return observableThrowError(err.status + ' An error occurred logging')
       })
     )
  }

}
