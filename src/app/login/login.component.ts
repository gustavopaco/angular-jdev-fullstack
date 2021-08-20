import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../service/login-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {username: "", password: ""};
  // usuario = new Usuario()
  loginService : LoginServiceService;

  constructor(loginService: LoginServiceService) {
    this.loginService = loginService;
  }

  public sigIn() {
    this.loginService.signIn(this.usuario);
  }

  ngOnInit(): void {
  }

}
