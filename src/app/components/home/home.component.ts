import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/Usuario";
import {ToastMessageService} from "../../shared/external/ngx-toastr/toast-message.service";
import {HttpValidator} from "../../shared/validator/http-validator";
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit{

  usuarios: Usuario[] = [];
  isAdmin: boolean = false;
  isFisica: boolean = false;
  isJuridica: boolean = false;

  constructor(private usuarioService: UsuarioService, private toastMessage: ToastMessageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadPermissions()
    this.loadUsuarios();
  }

  private loadPermissions() {
    this.isAdmin = this.authService.isAdmin();
    this.isFisica = this.authService.isFisica();
    this.isJuridica = this.authService.isJuridica();
  }

  private loadUsuarios() {
    if (this.authService.isAdmin()) {
      this.usuarioService.getAllUsuarios().subscribe({
        next: response => {
          this.usuarios = response;
        },
        error: err => {
          this.toastMessage.errorMessage(HttpValidator.validateResponseErrorMessage(err));
        }
      });
    }
  }
}
