import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConstants} from "../app-constants";
import {tap} from "rxjs/operators";
import {AppComponent} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private http: HttpClient;


  constructor(http: HttpClient) {
    this.http = http;
  }

  public signIn(usuario : object) {
    return this.http.post(AppConstants.baseLogin(), JSON.stringify(usuario)).subscribe(response => {
      console.log(response);
      /* Retorno Http */
      const token = (JSON.parse(JSON.stringify(response)).Authorization.split(" ")[1]);

      localStorage.setItem("token", token);

      console.info(`Token: ${localStorage.getItem("token")}`);
    }, error => {
        console.error("Erro ao fazer login");
        alert("Acesso negado");
        AppComponent.arguments.msgUsuarioError = "Usuario ou senha Invalidos";
    })
  }
}
