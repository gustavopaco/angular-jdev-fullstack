import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidator} from "../../../shared/validator/form-validator";
import {AuthService} from "../../../shared/service/auth.service";
import {ToastMessageService} from "../../../shared/external/ngx-toastr/toast-message.service";
import {Router} from "@angular/router";
import {HttpValidator} from "../../../shared/validator/http-validator";

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['../../../../assets/css/authenticate.min.css']
})
export class AuthenticateComponent implements OnInit {

  formulario!: FormGroup;
  formularioSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastMessage: ToastMessageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.generateForm();
  }

  private generateForm() {
    this.formulario = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onSubmit() {
    this.formularioSubmitted = true;
    if (this.formulario.valid) {
      this.authService.authenticate(this.formulario.value).subscribe({
        next: (response: any) => {
          this.toastMessage.successMessage("Usuário logado com sucesso.")
          this.authService.savePermissions(response.id, JSON.stringify(response.authorities), response.jwt);
          this.router.navigate(['/home'])
        },
        error: err => {
          this.toastMessage.errorMessage(HttpValidator.validateResponseErrorMessage(err));
        }
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
