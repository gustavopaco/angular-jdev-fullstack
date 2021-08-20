import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, /*IMPORTANT: Modulo de realizar requisicoes AJAX */
    ReactiveFormsModule,
    FormsModule /* Modulo de formulario para bindar objetos */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
