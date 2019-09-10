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

import {
  MatNativeDateModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatProgressBarModule, MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTableModule,
  MatPaginatorModule, MAT_DATE_LOCALE,
  MatDialogModule,
  MatSortModule,
  MatProgressSpinnerModule
} from '@angular/material';

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

