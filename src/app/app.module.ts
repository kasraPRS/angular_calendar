import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarDateFormatter, CalendarModule, DateAdapter, MOMENT } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import localeFa from '@angular/common/locales/fa';
import { CustomDateFormatter } from './calendar-date-formatter.provider';
import * as moment from 'moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeFr);
registerLocaleData(localeFa);
registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: adapterFactory
      })
  ],
  providers: [
    {
      provide: MOMENT, useValue: moment
    },
    {
      provide: CalendarDateFormatter, useClass: CustomDateFormatter
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
