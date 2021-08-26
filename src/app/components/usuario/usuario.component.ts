import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../service/usuario.service";
import {Usuario} from "../../model/usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioService: UsuarioService;
  usuarios: Usuario[];
  nomeUsuario: String;
  private routes : Router;
  numberOfElements = 0
  currentPage = 0;
  totalElements = 0;
  totalPages = 0;

  constructor(usuarioService: UsuarioService, routes : Router) {
    this.usuarioService = usuarioService;
    this.routes = routes;
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.routes.navigate(["/login"]);
    } else {
      this.usuarioService.findAllUsers().subscribe(response => {
        this.usuarios = response.content;
        this.numberOfElements = response.numberOfElements;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages
      })
    }
  }

  public deleteUsuario(id: Number) {
    if (confirm(`Are you sure?`)) {
      this.usuarioService.deleteUserByID(id).subscribe(() => {
        if (this.numberOfElements === 1 && this.totalPages > 1) { /* Verifica se ao deletar usuario o numero total de paginas eh > que 1 para nao retornar a pagina -1*/
          --this.currentPage
        }
        this.loadPageableUsers(this.currentPage)
      })
    }
  }

  public findUserByName($event: KeyboardEvent) {
    if (this.nomeUsuario.length >= 1 || this.nomeUsuario.length === 0) {
      this.currentPage = (this.currentPage > 0) ? 0 : this.currentPage; /* Verifica se a pagina atual ao fazer pesquisa eh maior que 0, se for seta a pesquisa pra voltar para pagina 0 */
      this.usuarioService.findUserByName(this.currentPage ,this.nomeUsuario).subscribe(response => {
        this.usuarios = response.content;
        this.numberOfElements = response.numberOfElements;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages
      })
    }
  }

  loadPageableUsers(currentPage: number) {
    currentPage = (currentPage === 0) ? 1 : currentPage;  /* Verifica se a pagina atual eh 0 para nao deixar retornar para pagina -1 */
    this.usuarioService.loadPageableUsers(currentPage -1).subscribe(response => {
      this.usuarios = response.content;
      this.numberOfElements = response.numberOfElements;
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages
    })
  }
}
