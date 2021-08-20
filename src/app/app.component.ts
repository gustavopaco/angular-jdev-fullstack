import { Component } from '@angular/core';
import {LoginServiceService} from "./service/login-service.service";
import {Usuario} from "./model/usuario";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-sb-microservicos';
  usuario = {username: "", password: ""};
  // usuario = new Usuario()
  loginService : LoginServiceService;

  constructor(loginService: LoginServiceService) {
    this.loginService = loginService;
  }

  public sigIn() {
    this.loginService.signIn(this.usuario);
  }
}
