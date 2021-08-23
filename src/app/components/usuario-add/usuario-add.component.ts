import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../service/usuario.service";
import {Usuario} from "../../model/usuario";

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  private router: ActivatedRoute;
  private usuarioService: UsuarioService;
  private routes: Router;
  usuario = new Usuario();

  constructor(router: ActivatedRoute, usuarioService: UsuarioService, routes: Router) {
    this.router = router;
    this.usuarioService = usuarioService;
    this.routes = routes;
  }

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get("id");

    if (id != null) {
      console.log(`Valor sendo Editado: ${id}`);
      this.findUserByID(id)
    }
  }

  public findUserByID(id: String) {
    this.usuarioService.findUserByID(id).subscribe(response => {
      this.usuario = response;
    });
  }

  public saveUser() {

    if (this.usuario.id === undefined){
      this.usuarioService.registerUser(this.usuario).subscribe(response => {
        localStorage.setItem("token", JSON.parse(JSON.stringify(response)).body.jwt)
      })
    } else {
      this.usuarioService.updateUser(this.usuario).subscribe(() => {
        console.log("Usuario atualizado com sucesso");
      })
    }
  }

  public back() {
    if (this.usuario.id === undefined) {
      this.routes.navigate(["/login"]);
    } else {
      this.routes.navigate(["/showusers"]);
    }
  }

}
