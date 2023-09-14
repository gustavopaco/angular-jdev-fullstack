import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../model/usuario";
import {AppConstants} from "../app-constants";

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  constructor(private http: HttpClient) { }

  public emailVerification(usuario : Usuario) : Observable<any> {
    return this.http.post(AppConstants.baseUserRecovery(), usuario)
  }

  public validationToken(token : String) : Observable<any> {
    let tokenFinal = "Bearer " + token
    let cabecalho = new HttpHeaders().set("Authorization",tokenFinal)
    return this.http.get(AppConstants.baseUserRecovery(), {headers : cabecalho});
  }

  public updatePassword(token : String, usuario: Usuario) : Observable<any> {
    let tokenFinal = "Bearer " + token
    let cabecalho = new HttpHeaders().set("Authorization",tokenFinal)
    return this.http.put(AppConstants.baseUserRecovery(), usuario, {headers : cabecalho})
  }
}
