import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthenticateComponent} from "./authenticate/authenticate.component";
import {RegisterComponent} from "./register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/components/shared.module";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {NgxMaskDirective} from "ngx-mask";
import {NgxCurrencyModule} from "ngx-currency";
import { RecoveryComponent } from './recovery/recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    RegisterComponent,
    AuthenticateComponent,
    RecoveryComponent,
    ResetPasswordComponent
  ],
  exports: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    BsDatepickerModule,
    NgxMaskDirective,
    NgxCurrencyModule
  ]
})
export class AuthModule {
}
