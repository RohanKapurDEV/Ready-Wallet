import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { ActionSheet } from '@ionic-native/action-sheet/ngx';

import { ChartsModule } from 'ng2-charts';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Clipboard } from '@ionic-native/clipboard/ngx'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatRippleModule, MatRadioModule } from '@angular/material';  

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ChartsModule, IonicStorageModule.forRoot(),
  BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatRadioModule, NgxQRCodeModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ActionSheet,
    BarcodeScanner,
    Clipboard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
