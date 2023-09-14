import {Component, Input} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-formulario-debug',
  templateUrl: './formulario-debug.component.html',
  styleUrls: ['./css/formulario-debug.min.css']
})
export class FormularioDebugComponent {

  @Input() formularioForDebug?: NgForm;
  @Input() formularioReativoDebug?: FormGroup

}
