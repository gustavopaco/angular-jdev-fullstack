import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastMessageService} from "../../../shared/external/ngx-toastr/toast-message.service";
import {FormValidator} from "../../../shared/validator/form-validator";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {RecoveryService} from "../../../shared/service/recovery.service";
import {HttpValidator} from "../../../shared/validator/http-validator";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../../../assets/css/reset-password.min.css'
  ]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;
  formularioSubmitted: boolean = false;
  tokenExpired: boolean = true;
  pathVariable?: string;

  inscricao: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private toastMessageService: ToastMessageService,
              private recoveryService: RecoveryService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getBasicToken();
    this.validateTokenExpired();
    this.generateForm();
  }

  private getBasicToken(): void {
    this.inscricao.push(this.activatedRoute.params.subscribe(path => {
      this.pathVariable = path['id']
    }))
  }

  private validateTokenExpired() {
    if (this.pathVariable) {
      let token = {basicToken: this.pathVariable}
      this.inscricao.push(this.recoveryService.validateTokenExpired(token).subscribe({
        next: response => {
          this.tokenExpired = false;
          this.formulario.get("basicToken")?.setValue(this.pathVariable)
        },
        error: err => {
          this.toastMessageService.errorMessage(HttpValidator.validateResponseErrorMessage(err))
          this.router.navigate(['/auth'])
        }
      }))
    }
    console.log(this.pathVariable);
  }


  private generateForm(): void {
    this.formulario = this.fb.group({
      basicToken: [null],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      repeatPassword: [null, [Validators.required, FormValidator.formBuilderValidateEqualsTo('newPassword')]]
    })
  }

  onSubmit(): void {
    this.formularioSubmitted = true;
    if (this.formulario.valid) {
      this.inscricao.push(this.recoveryService.resetPassword(this.formulario.value).subscribe({
        next: () => {
          this.toastMessageService.successMessage("Senha alterada com sucesso");
          this.router.navigate(['/auth'])
        },
        error: err => this.toastMessageService.errorMessage(HttpValidator.validateResponseErrorMessage(err))
      }))
    }
  }

  validatorInputNgClass(input: string): string {
    return FormValidator.validateInputNgClass(this.formularioSubmitted, <FormControl>this.formulario.get(input))
  }

  validatorSmallGenericMessage(input: string, inputName: string, inputNameEqualsTo?: string) {
    return FormValidator.validateSmallGenericMessage(<FormControl>this.formulario.get(input), inputName, inputNameEqualsTo)
  }

  ngOnDestroy(): void {
    this.inscricao.forEach(i => i.unsubscribe());
  }
}
