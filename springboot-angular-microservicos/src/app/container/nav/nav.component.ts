import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit{

  isLoginPage: boolean = false;
  isAdmin: boolean = false;
  isJuridica: boolean = false;
  isFisica: boolean = false;

  constructor(private authService: AuthService) {
  }

  invalidateSession() {
    this.authService.invalidateSession();
  }

  ngOnInit(): void {
    this.loadPermission();
  }

  private loadPermission(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isJuridica = this.authService.isJuridica();
    this.isFisica = this.authService.isFisica();
  }
}
