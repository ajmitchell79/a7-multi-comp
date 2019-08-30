import { Injectable } from '@angular/core';
import { HttpHeaders, HttpBackend } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from '../models/auth/user';
import { HttpClient } from '@angular/common/http';
import {IToken} from '../models/interfaces/auth/iToken';

@Injectable()
export class AuthenticationService {

  private jwtHelperService: JwtHelperService;
  private AUTH_TOKEN_NAME = 'AccessToken';
  private REFRESH_TOKEN_NAME = 'RefreshToken'; 
  public accessToken: string;
  public isLoggedIn: boolean =false;

  private http: HttpClient;

  public user: User = new User();
   
    constructor(handler: HttpBackend) {
      this.http = new HttpClient(handler);  //NOTE: using this will bypass the interceptor
      this.jwtHelperService = new JwtHelperService();
  }

load() : Promise<boolean>
{ 
  let token = this.getToken(this.AUTH_TOKEN_NAME);  //get token from local storage
 if (token && !this.jwtHelperService.isTokenExpired(token)) //if token not null and token not expired
  {
      this.accessToken = token;
      this.isLoggedIn = true;
      this.SetUserDetails(token);
      return new Promise<boolean>((resolve, reject) => {
        resolve(true);
      });
  }
else //call token server and load token for use
{
  let promise = new Promise<boolean>((resolve, reject) => {

    //---------

    let response = {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJMQU5DU1JFXFxhbWl0Y2hlbGwiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3dpbmRvd3N1c2VyY2xhaW0iOiIyMDViYjRmZC1kOGQzLTQ3N2ItODVhNC00NTQxMWMwNDc0MTYiLCJlbWFpbCI6ImFuZHJldy5taXRjaGVsbEBsYW5jYXNoaXJlZ3JvdXAuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbG9jYWxpdHkiOiJMT04iLCJ1bmlxdWVfbmFtZSI6IkFuZHJldyBNaXRjaGVsbCIsInJvbGUiOlsiREVQVF9JVCIsIkRFUFRfTU9ERUxMSU5HIiwiRklOX0FETUlOX1BXUl9VU0VSIiwiSERfQURNSU4iLCJIRF9ERVBMT1lfSVQiLCJIRF9ERVBMT1lfSVRfREIiLCJIRF9ERVBMT1lfSVRfSFciLCJIRF9ERVBMT1lfT1BTIiwiSERfREVQTE9ZX1dJWkkiLCJIRF9JTVBMRU1FTlRfR1JDIiwiSERfSU1QTEVNRU5UX0lUIiwiSERfSU1QTEVNRU5UX0lUX0hXIiwiSERfSU1QTEVNRU5UX01PREVMIiwiSERfSU1QTEVNRU5UX09QUyIsIkhEX0lNUExFTUVOVF9XSVpJIiwiSVRfVVNFUl9BRE1JTiIsIk1XRl9BRE1JTiIsIk1XRl9VU0VSIiwiVEFTS19BRE1JTiIsIlVTRVJfUEhPTkVfQURNSU4iLCJVV19DTEFJTV9DQVNIX01BVENIIl0sIm5iZiI6MTU0MjM3NjUxMSwiZXhwIjoxNTQyMzgwMTExLCJpYXQiOjE1NDIzNzY1MTF9.ITrT08Ypmzw7Xmqjo_DplOaOH6UCxmrcfQyycRg3qJU",
      "type": "Bearer",
      "refreshToken": "LZALRuvYd+k0u7UP6I4cMlYNeufWPXt7HZBSr6ewe5M=",
      "issued": "Fri, 16 Nov 2018 13:55:11 GMT",
      "expires": "Fri, 16 Nov 2018 14:55:11 GMT",
      "expiresIn": 3599
    };

    this.accessToken = response.accessToken;
    this.saveToLocalStorage(this.AUTH_TOKEN_NAME, response.accessToken);
    this.saveToLocalStorage(this.REFRESH_TOKEN_NAME, response.refreshToken);
    this.SetUserDetails(response.accessToken);
    this.isLoggedIn = true;

    resolve(true);
    //---------
    
    // this.http.post(environment.tokenApi,{},{withCredentials: true})
    //   .toPromise()
    //   .then(
    //     (response : IToken) => { // Success
    //       if (response) {
    //          this.accessToken = response.accessToken;

    //            // store username and jwt token in local storage to keep user logged in between page refreshes

    //           this.saveToLocalStorage(this.AUTH_TOKEN_NAME, response.accessToken);
    //           this.saveToLocalStorage(this.REFRESH_TOKEN_NAME, response.refreshToken);

    //           this.SetUserDetails(response.accessToken);
    //           this.isLoggedIn = true;

    //       } else {
    //           reject(false);
    //       }
    //       resolve(true);
    //     },

    //     msg => { // Error occurred
    //       reject(false);
    //     }
    //   );
  });
  return promise;
}
}

private SetUserDetails(token: string)
  {
    //decode token
    let decodedToken = this.jwtHelperService.decodeToken(token);
    this.user.userName = decodedToken.unique_name;
    this.user.roles = decodedToken.role;
    this.user.userGuid = decodedToken[environment.TOKEN_USERGUID];
    this.user.locality = decodedToken[environment.TOKEN_LOCALITY];
    this.user.email = decodedToken.email;
    this.user.login = decodedToken.nameid;
  }

  private saveToLocalStorage(name: string, body: any): void
  {
    //save to local storage
    localStorage.setItem(name, body);
  }

  public getToken(name: string){
    return localStorage.getItem(name);
  }

  public clearAuthToken(name: string): void {
  // clear token remove user from local storage to log user out
    this.accessToken = null;
    localStorage.removeItem(name);
}

public GetContentTypeHeaderJson()
  {
    return new HttpHeaders({ 'Content-Type': 'application/json'});
  }

}
