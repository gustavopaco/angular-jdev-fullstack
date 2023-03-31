import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/Usuario";
import {ToastMessageService} from "../../shared/external/ngx-toastr/toast-message.service";
import {HttpValidator} from "../../shared/validator/http-validator";
import {AuthService} from "../../shared/service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy{

  usuarios: Usuario[] = [];
  isAdmin: boolean = false;
  isFisica: boolean = false;
  isJuridica: boolean = false;
  formularioPesquisa!: FormGroup;
  inscricao: Subscription[] = [];

  constructor(private usuarioService: UsuarioService,
              private toastMessage: ToastMessageService,
              private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.generateForm();
    this.loadPermissions()
    this.loadUsuarios();
    this.findUsuariosByNome();
  }

  private generateForm(): void {
    this.formularioPesquisa = this.fb.group({
      nome: [null]
    })
  }

  private loadPermissions(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isFisica = this.authService.isFisica();
    this.isJuridica = this.authService.isJuridica();
  }

  private loadUsuarios(): void {
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

  deleteUsuario(id: number | undefined): void {
    if (confirm("Tem certeza que deseja deletar esse Usuário?") ) {
      if (id)
        this.deleteUsuarioApi(id);
    }
  }

  private deleteUsuarioApi(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.toastMessage.successMessage("Usuário deletado com sucesso.");
        if (Number(this.authService.getUserId()) == id) {
          this.authService.invalidateSession();
          this.router.navigate(['/auth'])
        }
        this.usuarios = this.usuarios.filter(u => u.id != id);

      },
      error: err => {HttpValidator.validateResponseErrorMessage(err);}
    })
  }

  private findUsuariosByNome(): void {
    this.inscricao.push(this.formularioPesquisa.get("nome")!.valueChanges.subscribe(data => {
      if (data.length > 2) {
        this.usuarioService.getAllUsuariosByName(data).subscribe({
          next: response => this.usuarios = response,
          error: err => {HttpValidator.validateResponseErrorMessage(err)}
        })
      }
      if (data.length == 0 ) {
        this.loadUsuarios();
      }
    }))
  }

  ngOnDestroy(): void {
    this.inscricao.forEach(i => i.unsubscribe());
  }
}
