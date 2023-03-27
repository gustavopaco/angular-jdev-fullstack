import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_LOGIN} from "../constant/API";
import {Router} from "@angular/router";
import {Role} from "../model/Role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  authenticate(formulario: any) {
    return this.httpClient.post(API_LOGIN, formulario)
  }

  isUserLogged(): boolean {
    return localStorage.getItem("fullToken") != undefined;
  }

  savePermissions(authorities: string, jwt: string): void {
    localStorage.setItem("fullToken", jwt);
    localStorage.setItem("authorities", authorities)
  }

  getPermissions(permission: string): boolean {
    let roles: Role[] = JSON.parse(<string>localStorage.getItem("authorities"))
    return !!roles.find(r => r.authority == permission)

  }

  isAdmin() : boolean {
    return this.getPermissions("ROLE_ADMIN");
  }

  isFisica(): boolean {
    return this.getPermissions("ROLE_FISICA");
  }

  isJuridica(): boolean {
    return this.getPermissions("ROLE_JURIDICA");
  }

  getFullToken(): string {
    return <string>localStorage.getItem("fullToken");
  }

  invalidateSession(): void {
    localStorage.clear();
    this.router.navigate(['/auth'])
  }

}
