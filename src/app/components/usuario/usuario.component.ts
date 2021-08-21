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
    this.usuarioService.findAllUsers().subscribe( response => {
      this.usuarios = response;
    })
  }
}
