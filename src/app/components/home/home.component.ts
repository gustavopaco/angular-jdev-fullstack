import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/Usuario";
import {ToastMessageService} from "../../shared/external/ngx-toastr/toast-message.service";
import {HttpValidator} from "../../shared/validator/http-validator";
import {AuthService} from "../../shared/service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";
import {ReportService} from "../../shared/service/report.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  isAdmin: boolean = false;
  isFisica: boolean = false;
  isJuridica: boolean = false;

  pesquisa: FormControl = new FormControl();


  currentPage: number = 1;
  totalElements: number = 0
  totalPages: number = 0;
  numberOfElements: number = 0;

  @ViewChild('iframeComponent') iFrame!: ElementRef;
  inscricao: Subscription[] = [];

  constructor(private usuarioService: UsuarioService,
              private toastMessage: ToastMessageService,
              private authService: AuthService,
              private router: Router,
              private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.loadPermissions()
    this.loadUsuarios();
    this.findUsuariosByNome();
  }

  private loadPermissions(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isFisica = this.authService.isFisica();
    this.isJuridica = this.authService.isJuridica();
  }

  downloadReport(): void {
    this.inscricao.push(this.reportService.downloadBasicReport().subscribe({
      next: response => {
        this.iFrame.nativeElement.src = response.report;
      },
      error: err => this.toastMessage.errorMessage(HttpValidator.validateResponseErrorMessage(err))
    }))
  }

  private loadUsuarios(): void {
    if (this.authService.isAdmin()) {
      this.usuarioService.getAllUsuarios().subscribe({
        next: response => {
          this.loadPageableUsuario(response);
          this.backToFirstPage();
        },
        error: err => {
          this.toastMessage.errorMessage(HttpValidator.validateResponseErrorMessage(err));
        }
      });
    }
  }

  private loadPageableUsuario(response: any): void {
    this.usuarios = response.content;
    this.totalElements = response.totalElements;
    this.numberOfElements = response.numberOfElements;
    this.totalPages = response.totalPages;
  }

  private backToFirstPage() {
    this.currentPage = 1;
  }

  private findUsuariosByNome(): void {
    this.inscricao.push(this.pesquisa.valueChanges.pipe(debounceTime(800)).subscribe(data => {
      if (data.length > 2) {
        this.inscricao.push(this.usuarioService.getUsuariosPage(0, this.pesquisa.value).subscribe({
          next: response => {
            this.loadPageableUsuario(response);
            this.backToFirstPage();
          },
          error: err => {
            HttpValidator.validateResponseErrorMessage(err)
          }
        }))
      } else if (data.length == 0) {
        this.loadUsuarios();
      }
    }))
  }

  onPageChange(page: number): void {
    page = (page === 0) ? 1 : page
    this.inscricao.push(this.usuarioService.getUsuariosPage(page - 1, this.pesquisa.value).subscribe({
      next: response => {
        this.loadPageableUsuario(response);
      },
      error: err => this.toastMessage.errorMessage(HttpValidator.validateResponseErrorMessage(err))
    }))
  }

  deleteConfirmation(id: number | undefined): void {
    if (confirm("Tem certeza que deseja deletar esse Usuário?")) {
      if (id)
        this.deleteUsuarioApi(id);
    }
  }

  private deleteUsuarioApi(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.toastMessage.successMessage("Usuário deletado com sucesso.");
        if (this.onDeleteIsSelfDelete(id)) {
          this.invalidateUsuario();
        } else {
          this.onDeleteRemoveUsuarioFromList(id);
        }
      },
      error: err => {
        HttpValidator.validateResponseErrorMessage(err);
      }
    })
  }

  private onDeleteRemoveUsuarioFromList(id: number): void {
    this.usuarios = this.usuarios.filter(u => u.id != id);
    --this.totalElements;
    --this.numberOfElements;
    this.onDeleteVerifyLastElementFromPage();
  }

  //Note: Metodo que verifica se ao Deletar item, o numero total de paginas eh maior que 1,
  // e o numero de elementos na pagina atual eh 0 ou seja, acabou de deletar o ultimo item.
  // Se sim, volta para pagina anterior e Recarrega daados na tela
  private onDeleteVerifyLastElementFromPage(): void {
    if (this.totalPages > 1 && this.numberOfElements === 0) {
      --this.currentPage;
      this.onPageChange(this.currentPage);
    }
  }

  private onDeleteIsSelfDelete(id: number): boolean {
    return (Number(this.authService.getUserId()) == id);
  }

  private invalidateUsuario(): void {
    this.authService.invalidateSession();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.inscricao.forEach(i => i.unsubscribe());
  }
}
