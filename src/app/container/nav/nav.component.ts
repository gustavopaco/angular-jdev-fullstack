import { Component } from '@angular/core';
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent {

  isLoginPage: boolean = false;

  constructor(private authService: AuthService) {
  }

  invalidateSession() {
    this.authService.invalidateSession();
  }
}
