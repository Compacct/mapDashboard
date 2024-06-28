import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MapCanvasComponent } from './map-canvas/map-canvas.component';
import { CompacctDaterangepickerComponent } from './daterangepicker/daterangepicker.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { registerLicense } from '@syncfusion/ej2-base';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
registerLocaleData(en);
// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXZceHRdR2BeU0F+W0I='); 
@NgModule({
  declarations: [
    AppComponent,
    MapCanvasComponent,
    CompacctDaterangepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFaXNvUSNlqQoqlNBgCgppWcSeYxb5kDM',
      libraries: ['places', 'geometry','drawing']
    }),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzModalModule,
    NzMenuModule,
    NzGridModule,
    NzLayoutModule,
    NzSpaceModule,
    NzPageHeaderModule,
    NzDropDownModule,
    NzIconModule,
    NzSelectModule,
    HttpClientModule,
    DateRangePickerModule,
    NzTableModule,
    NzButtonModule,
    NzDrawerModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
