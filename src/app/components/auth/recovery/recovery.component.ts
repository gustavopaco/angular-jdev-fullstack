import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecoveryService} from "../../../shared/service/recovery.service";
import {ToastMessageService} from "../../../shared/external/ngx-toastr/toast-message.service";
import {FormValidator} from "../../../shared/validator/form-validator";

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: [ '../../../../assets/css/recovery.min.css'
  ]
})
export class RecoveryComponent implements OnInit{

  formulario!: FormGroup;
  formularioSubmitted: boolean = false;

  constructor(private fb: FormBuilder,
              private recoveryService: RecoveryService,
              private toastMessageService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.generateForm();
  }

  private generateForm() {
    this.formulario = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    this.formularioSubmitted = true;
    if (this.formulario.valid) {
      this.recoveryService.sendEmail(this.formulario.value).subscribe({
        next: () => this.toastMessageService.successMessage("E-mail enviado com sucesso.")
      })
    }
  }

  validatorInputNgClass(input: string): string {
    return FormValidator.validateInputNgClass(this.formularioSubmitted, <FormControl>this.formulario.get(input))
  }

  validatorSmallGenericMessage(input: string, inputName: string) {
    return FormValidator.validateSmallGenericMessage(<FormControl>this.formulario.get(input), inputName)
  }
}
