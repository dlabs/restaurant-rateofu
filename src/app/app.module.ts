import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";



import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkTableModule} from "@angular/cdk/table";
import {MatTableModule} from '@angular/material/table';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent,
    OrdersDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    CdkTableModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
