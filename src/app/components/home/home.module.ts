import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {UsuarioDetailsComponent} from './usuario/usuario-details/usuario-details.component';
import {AuthModule} from "../auth/auth.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { UsuarioReportComponent } from './usuario/usuario-report/usuario-report.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {SharedModule} from "../../shared/components/shared.module";


@NgModule({
  declarations: [
    HomeComponent,
    UsuarioDetailsComponent,
    UsuarioReportComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    BsDatepickerModule
  ]
})
export class HomeModule { }
