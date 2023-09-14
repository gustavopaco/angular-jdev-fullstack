import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../service/usuario.service";
import {Usuario} from "../../model/usuario";
import {TelefoneService} from "../../service/telefone.service";
import {Telefone} from "../../model/telefone";
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModal,
  NgbModalConfig
} from "@ng-bootstrap/ng-bootstrap";
import {Profissao} from "../../model/profissao";
import {ProfissaoService} from "../../service/profissao.service";
import {Role} from "../../model/role";
import {RoleService} from "../../service/role.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';   /* Delimitador de data */

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDiaMes(date.day) + this.DELIMITER + validarDiaMes(date.month) + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class FormataData extends NgbDateParserFormatter {
  readonly DELIMITER = '/';   /* Delimitador de data */
  format(date: NgbDateStruct | null): string {
    return date ? validarDiaMes(date.day) + this.DELIMITER + validarDiaMes(date.month) + this.DELIMITER + date.year : '';
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }
}

function validarDiaMes(valor: any) {
  if (valor !== undefined && valor <= 9) {
    return "0" + valor
  } else {
    return valor;
  }
}

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: CustomAdapter}, {
    provide: NgbDateParserFormatter,
    useClass: FormataData
  }, NgbModalConfig, NgbModal]
})
export class UsuarioAddComponent implements OnInit {

  private router: ActivatedRoute;
  private usuarioService: UsuarioService;
  private telefoneService: TelefoneService;
  private profissaoService: ProfissaoService;
  private routes: Router;
  usuario = new Usuario();
  telefone = new Telefone();
  profissoes: Array<Profissao> = [];
  dropdownList : any;
  dropdownSettings : any;


  constructor(router: ActivatedRoute, usuarioService: UsuarioService,
              routes: Router, telefoneService: TelefoneService,
              private modalService: NgbModal, config: NgbModalConfig, profissaoService: ProfissaoService,
              private roleService : RoleService) {
    this.router = router;
    this.usuarioService = usuarioService;
    this.routes = routes;
    this.telefoneService = telefoneService;
    config.backdrop = "static";
    config.keyboard = false;
    this.profissaoService = profissaoService;
  }

  ngOnInit(): void {
    this.dropdownSettings = this.getSettings();
    this.getProfissoes();
    this.getRoles();
    let id = this.router.snapshot.paramMap.get("id");

    if (id != null) {
      this.findUserByID(id);
    }
  }

  getSettings() {
    return {
      singleSelection: false,
      idField: 'id',
      textField: 'authority',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  public findUserByID(id: String) {
    this.usuarioService.findUserByID(id).subscribe(response => {

      this.usuario = response;

      if (this.usuario.profissao === null) {
        this.usuario.profissao = new Profissao();
      }
    });
  }

  public saveUser() {
    if (this.usuario.id === undefined) {
      this.usuarioService.registerUser(this.usuario).subscribe(response => {
        localStorage.setItem("token", JSON.parse(JSON.stringify(response)).body.jwt);
        this.routes.navigate(["/home"]);
      })
    } else {
      if (this.usuario.newPassword !== undefined && this.usuario.reapeatPassword !== undefined) {
          if (this.usuario.newPassword !== "" && this.usuario.reapeatPassword !== "") {
            if (this.usuario.newPassword === this.usuario.reapeatPassword) {

              this.usuario.password = this.usuario.newPassword;

              this.usuarioService.updateUser(this.usuario).subscribe(() => {
                alert("User updated!")
                this.routes.navigate(["/showusers"]);
              });
            } else {
              alert("Passwords must match!");
            }
          } else {
            alert("Passwords must have at least 3 characters!");
          }
      } else {
        this.usuarioService.updateUser(this.usuario).subscribe(() => {
          alert("User updated!")
          this.routes.navigate(["/showusers"]);
        });
      }
    }
  }

  public back() {
    if (this.usuario.id === undefined) {
      this.routes.navigate(["/login"]);
    } else {
      this.routes.navigate(["/showusers"]);
    }
  }

  public deletarTelefone(id: Number, i: any) {
    if (confirm("Are you sure?")) {
      this.telefoneService.deletarTelefone(id).subscribe(() => {
        console.info("Telefone foi deletado");
        this.ngOnInit();
        /* console.info("Index do item clicado vindo da tela: " + i) => IMPORTANT: Removendo telefone da tela sem ter que recarregar a Pagina
        this.usuario.telefones.splice(i,1)*/
      })
    }
  }

  public addNewPhone() {
    this.telefoneService.addNewPhone(this.usuario.id, this.telefone).subscribe(() => {
      this.telefone = new Telefone();
      this.modalService.dismissAll()
      this.ngOnInit()
    })
  }

  open(content: any) {
    this.modalService.open(content, {centered: true});
  }

  getProfissoes() {
    this.profissaoService.getProfissoes().subscribe(response => {
      this.profissoes = response;
    })
  }

  showPasswordInterface() {

    // @ts-ignore
    document.getElementById("lblnovoPassword").style.display = "initial";
    // @ts-ignore
    document.getElementById("lblrepetirPassword").style.display = "initial";
    // @ts-ignore
    document.getElementById("novoPassword").style.display = "initial";
    // @ts-ignore
    document.getElementById("repetirPassword").style.display = "initial";
  }

  public getRoles() {
    this.roleService.getRoles().subscribe(response => {
      this.dropdownList = response
    })
  }
}
