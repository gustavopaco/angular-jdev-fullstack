import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormularioDebugComponent} from "./formulario-debug/formulario-debug.component";
import {NgElseDirective} from "../diretiva/ng-else.directive";


@NgModule({
  declarations: [
    FormularioDebugComponent,
    NgElseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormularioDebugComponent,
    NgElseDirective
  ]
})
export class SharedModule { }
