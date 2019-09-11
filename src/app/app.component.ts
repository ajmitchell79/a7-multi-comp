import { Component,ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { ToastrModule,  ToastContainerDirective, ToastrService} from 'ngx-toastr';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  version: string = environment.envVersion;
  environment: string = environment.envName;
  userName: string 

  @ViewChild(ToastContainerDirective, { static: false }) toastContainer: ToastContainerDirective;

  constructor(public configService: ConfigService, private toastrService: ToastrService)
  {

  this.toastrService.toastrConfig.positionClass = "toast-top-full-width";
  this.toastrService.toastrConfig.maxOpened = 1;

  }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    
  }
}
