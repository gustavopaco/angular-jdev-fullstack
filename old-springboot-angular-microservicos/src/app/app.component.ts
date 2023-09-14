import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-sb-microservicos';
  private routes: Router;

  constructor(routes: Router) {
    this.routes = routes;
  }

  ngOnInit(): void {
  }

  public logout() {
    localStorage.clear();
  }

  public goHome() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.routes.navigate(["/home"]);
    }
  }

  public goUsuario() {
    const token = localStorage.getItem("token");

    if (token !== null) {
      this.routes.navigate(["/showusers"]);
    } else {
      this.routes.navigate(["/login"]);
    }
  }

  public esconderMenu() {
    const token = localStorage.getItem("token");
    return token !== null;

  }
}
