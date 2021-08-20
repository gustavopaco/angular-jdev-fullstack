import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-sb-microservicos';
  private routes : Router

  constructor(routes : Router) {
    this.routes = routes;
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.routes.navigate(["home"]);
    } else {
      this.routes.navigate(["login"]);
    }
  }

  public logout() {
    localStorage.clear();
    this.routes.navigate(["login"]);
  }

  public goHome() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.routes.navigate(["home"]);
    } else {
      this.routes.navigate(["login"]);
    }
  }
}
