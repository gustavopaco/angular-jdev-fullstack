import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecoveryService} from "../../service/recovery.service";
import {Usuario} from "../../model/usuario";

@Component({
  selector: 'app-usuario-resetpassword',
  templateUrl: './usuario-resetpassword.component.html',
  styleUrls: ['./usuario-resetpassword.component.css']
})
export class UsuarioResetpasswordComponent implements OnInit {

  tk : any;
  usuario = new Usuario();
  newpassword : String;
  repeatpassword : String;

  constructor(private router : ActivatedRoute, private recoveryService : RecoveryService, private routes : Router) { }

  ngOnInit(): void {
    this.tk = this.router.snapshot.paramMap.get("tk");

    /*TODO: VALIDAR TOKEN COM O SERVIDOR*/
    this.recoveryService.validationToken(this.tk).subscribe(() =>{}, error => {
      alert("Invalid Link, please try to recovery yout password again");
      this.routes.navigate(["/login"]);
    })
  }

  resetarSenha() {
    if (this.newpassword !== this.repeatpassword) {
      alert("Passwords must match!")
    }else {
      /* TODO: GRAVAR NOVA SENHA */
      this.usuario.password = this.newpassword;
      this.recoveryService.updatePassword(this.tk, this.usuario).subscribe(response => {
        alert("Password Updated");
        this.routes.navigate(["/login"]);
      }, error => {
        alert(error.error.message);
        this.routes.navigate(["/login"]);
      });
    }
  }
}
