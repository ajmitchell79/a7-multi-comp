import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import {User} from '../models/auth/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.user;
  }

}
