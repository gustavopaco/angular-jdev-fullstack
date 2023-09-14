import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private routes : Router;

  constructor(routes : Router) {
    this.routes = routes;
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.routes.navigate(["/login"]);
    }
  }

}
