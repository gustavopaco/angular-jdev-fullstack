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
  private routes : Router

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
        this.usuarios = response;
      })
    }
  }

  public deleteUsuario(id: Number) {
    if (confirm(`Voce confirma que deseja deletar esse usuario?`)) {
      this.usuarioService.deleteUserByID(id).subscribe(() => {
        this.usuarioService.findAllUsers().subscribe(atualizarLista => {
          this.usuarios = atualizarLista;
        })
      })
    }
  }

  public findUserByName($event: KeyboardEvent) {
    if (this.nomeUsuario.length >= 3 || this.nomeUsuario.length === 0) {
      this.usuarioService.findUserByName(this.nomeUsuario).subscribe(response => {
        this.usuarios = response;
      })
    }
  }
}
