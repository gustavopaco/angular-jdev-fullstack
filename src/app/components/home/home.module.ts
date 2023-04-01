import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {UsuarioDetailsComponent} from './usuario/usuario-details/usuario-details.component';
import {AuthModule} from "../auth/auth.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    HomeComponent,
    UsuarioDetailsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class HomeModule { }
