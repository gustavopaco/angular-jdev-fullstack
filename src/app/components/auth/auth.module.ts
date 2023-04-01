import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthenticateComponent} from "./authenticate/authenticate.component";
import {RegisterComponent} from "./register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/components/shared.module";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {NgxMaskDirective} from "ngx-mask";


@NgModule({
    declarations: [
        RegisterComponent,
        AuthenticateComponent
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
        NgxMaskDirective
    ]
})
export class AuthModule {
}
