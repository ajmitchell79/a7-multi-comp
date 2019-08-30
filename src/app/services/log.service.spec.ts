import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';
import { HttpClient, HttpHandler,HttpBackend } from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

describe('LogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[HttpClient, HttpHandler,HttpBackend,AuthenticationService ]
  }));

  it('should be created', () => {
    const service: LogService = TestBed.get(LogService);
    expect(service).toBeTruthy();
  });
});
