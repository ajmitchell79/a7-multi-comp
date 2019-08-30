import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { map ,  catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { IConfig }  from '../models/interfaces/iConfig';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient, private authService: AuthenticationService ) {
}

public initialised = false;
public loadError : any;

viewModel: any;

public getConfig(): Promise<any> {
  //debugger;
  //Call load to make sure we have a valid token, if we don't then it will go to the auth server to get one
  //once this returns the config service will be called to get the default setting

  let promise = this.authService.load()
  .then(
    data => {
      let promiseConfig = new Promise<boolean>((resolve, reject) => {

       //------------------------------------

        this.viewModel = <IConfig>{serverEnvironment: 'the new server'};
        resolve(true);       

       //------------------------------------

      // this.http.get(environment.configApi, {headers: this.authService.GetContentTypeHeaderJson() })
      //         .toPromise()
      //         .then(
      //           response => { 
      //             // Success         
      //               this.initialised = true;                                   
      //               this.viewModel = response;
      //               resolve(true);                    
      //           },
      //           error => { 
      //             this.initialised = false;
      //             this.loadError = error;
                  
      //             //this will go to the global error handler, but no component will be loaded (ie you get stuck on index.html)
      //             //reject(error);

      //           //this wont go to the global error handler, app component will get loaded, need to handle it there
      //           resolve(error);
      //           }
      //         );
          });
          return promiseConfig;
    }
  )
  return promise;
}
}
