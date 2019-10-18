import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { LogService } from '../../services/log.service';
import { ToastrService, ToastrConfig, IndividualConfig } from 'ngx-toastr';

import * as StackTrace from 'stacktrace-js';
import { LocationStrategy } from '@angular/common';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
    //manually call the injector with the service name in the execution, needs to be loaded first, cant use DI here
    constructor(private injector: Injector) { }

    toastErrorConfig: IndividualConfig;
    toastWarningConfig: IndividualConfig;
  
  
  handleError(error: Error | HttpErrorResponse) { 
      debugger;

    const logService = this.injector.get(LogService);
    const location = this.injector.get(LocationStrategy);
    const toastrService = this.injector.get(ToastrService);
    const router = this.injector.get(Router);
    
    const message = error.message ? error.message : error.toString();
    //const url = location._platformLocation.location.href;
    const url = "my url";

    this.toastErrorConfig = Object.assign({}, toastrService.toastrConfig);
    this.toastErrorConfig.timeOut = 0;
    this.toastErrorConfig.extendedTimeOut = 0;
    this.toastErrorConfig.closeButton = true;

    this.toastWarningConfig = Object.assign({}, toastrService.toastrConfig);
    this.toastWarningConfig.closeButton = false;


    //let stackString = "";

    if (error instanceof HttpErrorResponse) {
        // Server or connection error happened
        if (!navigator.onLine) {
          // Handle offline error
          toastrService.error('No Internet Connection', 'Error connecting to the API',this.toastErrorConfig);
        } else {
          // Handle Http Error (error.status === 403, 404...)
          if (error.status ==500) //probably an error in the API, DONT redirect
          {
            let trace = this.getStackTrace(error);

            logService
            .log({Level: 'Error', Message: error.message, Url: url, Stack: trace })
            .subscribe(errorWithContextInfo => { //this is the result from the service call (returns true at the moment)
                toastrService.error(`${error.error}`, 'An error occurred with your operation',this.toastErrorConfig);
            });
          }
          else //401, 403, 404 -- dont log for now
          {
            toastrService.error(`${error.message}`, 'An error occurred with your operation',this.toastErrorConfig);
          }
        }
     } else {
         // Handle Client Error (Angular Error, ReferenceError...)     
        let trace = this.getStackTrace(error);

        logService
        .log({Level: 'Error', Message: message, Url: url, Stack: trace })
        .subscribe(errorWithContextInfo => { //this is the result from the service call (returns true at the moment)
            toastrService.error(message, 'Application Error',this.toastErrorConfig);
        });
    }}

    private getStackTrace(error) : string
    {
        let stackString = "";
        StackTrace.fromError(error).then(stackframes => {
            stackString = stackframes
            .splice(0, 10)
            .map(function(sf) {
                return sf.toString();
            }).join('\n');
        });
        return stackString;
    }

}
