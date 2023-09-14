import { Component, OnInit } from '@angular/core';
import {RecoveryService} from "../../service/recovery.service";
import {Usuario} from "../../model/usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuario-recovery',
  templateUrl: './usuario-recovery.component.html',
  styleUrls: ['./usuario-recovery.component.css']
})
export class UsuarioRecoveryComponent implements OnInit {

  usuario = new Usuario();

  constructor(private recoveryService : RecoveryService, private routes : Router) { }

  ngOnInit(): void {
  }

  public emailVerification() {
    this.recoveryService.emailVerification(this.usuario).subscribe((response) => {
      alert("Email Enviado com Sucesso.")
      this.routes.navigate(["/login"]);
    }, error => {
     alert(error.error.message);
    })
  }
}
