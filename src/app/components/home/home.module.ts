import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UsuarioDetailsComponent } from './usuario/usuario-details/usuario-details.component';
import {AuthModule} from "../auth/auth.module";


@NgModule({
  declarations: [
    HomeComponent,
    UsuarioDetailsComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        AuthModule
    ]
})
export class HomeModule { }
