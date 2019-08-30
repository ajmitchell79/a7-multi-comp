import { TestBed, async, inject } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpClient, HttpHandler,HttpBackend } from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';

describe('TokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptor, AuthenticationService, HttpClient, HttpHandler,HttpBackend  ]
    });
  });

  it('should ...', inject([TokenInterceptor], (guard: TokenInterceptor) => {
    expect(guard).toBeTruthy();
  }));
});
