import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../service/usuario.service";
import {Usuario} from "../../model/usuario";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioService : UsuarioService
  usuarios : Usuario[];

  constructor(usuarioService : UsuarioService) {
    this.usuarioService = usuarioService;
  }

  ngOnInit(): void {
    console.log("Valor do Token ShowUsersComponent: " + localStorage.getItem("token"));

    this.usuarioService.findAllUsers().subscribe( response => {
      console.log("RESPONSE: " + response);
      this.usuarios = response;
    })
  }
}
