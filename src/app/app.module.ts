import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { TokenInterceptor } from './shared/interceptor/token.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartModule } from 'angular-highcharts';

import { ToastrModule } from 'ngx-toastr';

import {SharedModule} from './shared/shared.module';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { AuthenticationService } from './services/authentication.service';
import { ConfigService } from './services/config.service';

import { GlobalErrorHandler } from './shared/error/GlobalErrorHandler';
import { ChartComponent } from './shared/chart/chart.component';
import { MenuitemComponent } from './home/menuitem/menuitem.component';
import { ContentitemComponent } from './home/contentitem/contentitem.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent, 
    routingComponents, 
    ChartComponent,
    MenuitemComponent,
    ContentitemComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatTableModule,
    MatDialogModule,
    MatSortModule,
    ChartModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {   //pre-load config service, which will check auth token exists
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    },
    // {
    //   provide: ErrorHandler, 
    //   useClass: GlobalErrorHandler
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },

    AuthenticationService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function configServiceFactory(configService: ConfigService): Function {
  return () => configService.getConfig();
}

