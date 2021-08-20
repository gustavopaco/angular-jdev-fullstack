import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../app-constants";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private http: HttpClient;
  private routes: Router

  constructor(http: HttpClient, routes: Router) {
    this.http = http;
    this.routes = routes;
  }

  public signIn(usuario : object) {
    return this.http.post(AppConstants.baseLogin(), JSON.stringify(usuario)).subscribe(response => {

      /* Retorno Http */
      const token = (JSON.parse(JSON.stringify(response)).Authorization.split(" ")[1]);

      /*Gravando o token na sessao*/
      localStorage.setItem("token", token);

      // console.info(`Token: ${localStorage.getItem("token")}`);

      /*Navegando para a URI home em caso de sucesso.*/
      this.routes.navigate(["home"]);

    }, error => {
        console.error("Erro ao fazer login");
        alert("Acesso negado");
        AppComponent.arguments.msgUsuarioError = "Usuario ou senha Invalidos";
    })
  }}
