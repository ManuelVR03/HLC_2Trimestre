import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { RouteReuseStrategy } from '@angular/router';



import { IonicModule, IonicRouteStrategy } from '@ionic/angular';



import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { ApiServiceProvider } from '../app/providers/api-service/api-service';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';



@NgModule({

 declarations: [AppComponent],

 imports: [IonicStorageModule.forRoot(), BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, HttpClientModule],

 providers: [ApiServiceProvider, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],

 bootstrap: [AppComponent],

})

export class AppModule {}