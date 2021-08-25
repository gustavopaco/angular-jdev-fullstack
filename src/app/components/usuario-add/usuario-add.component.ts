import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../service/usuario.service";
import {Usuario} from "../../model/usuario";
import {TelefoneService} from "../../service/telefone.service";
import {Telefone} from "../../model/telefone";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class UsuarioAddComponent implements OnInit {

  private router: ActivatedRoute;
  private usuarioService: UsuarioService;
  private telefoneService : TelefoneService;
  private routes: Router;
  usuario = new Usuario();
  telefone = new Telefone();


  constructor(router: ActivatedRoute, usuarioService: UsuarioService, routes: Router, telefoneService : TelefoneService, private modalService : NgbModal, config : NgbModalConfig) {
    this.router = router;
    this.usuarioService = usuarioService;
    this.routes = routes;
    this.telefoneService = telefoneService;
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get("id");

    if (id != null) {
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
        localStorage.setItem("token", JSON.parse(JSON.stringify(response)).body.jwt);
        this.routes.navigate(["/home"]);
      })
    } else {
      this.usuarioService.updateUser(this.usuario).subscribe(() => {
        console.log("Usuario atualizado com sucesso");
        this.routes.navigate(["/showusers"]);
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

  public deletarTelefone(id : Number) {
    if (confirm("Tem certeza que deseja deletar esse Telefone?")) {
      this.telefoneService.deletarTelefone(id).subscribe(() => {
        console.info("Telefone foi deletado");
        this.ngOnInit();
      })
    }
  }

  public addNewPhone() {
    this.telefoneService.addNewPhone(this.usuario.id,this.telefone).subscribe(() => {
      this.telefone = new Telefone();
      this.modalService.dismissAll()
      this.ngOnInit()
    })
  }

  open(content : any) {
    this.modalService.open(content, {centered : true});
  }
}
