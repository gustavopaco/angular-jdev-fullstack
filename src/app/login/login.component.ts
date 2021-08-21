import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../service/login-service.service";
import {Usuario} from "../model/usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // usuario = {username: "", password: ""};
  usuario = new Usuario();
  loginService : LoginServiceService;
  private routes : Router

  constructor(loginService: LoginServiceService, routes : Router) {
    this.loginService = loginService;
    this.routes = routes;
  }

  public sigIn() {
    this.loginService.signIn(this.usuario);
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.routes.navigate(["/login"]);
    }
  }

}
