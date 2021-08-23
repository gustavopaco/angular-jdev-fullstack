import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConstants} from "../app-constants";
import {Observable} from "rxjs";
import {Usuario} from "../model/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http;
  }

  public findAllUsers() : Observable<any> {
    // const token = `Bearer ${localStorage.getItem("token")}`;
    // const headers = new HttpHeaders().set("Authorization",token); /* Setando Authorization no Header*/
    const url = `${AppConstants.baseUsuario()}/v1`;
    // return this.http.get<Usuario[]>(url, {headers : headers}); /* Passando o Header como parametro com o Authorization */
    return this.http.get<Usuario[]>(url);
  }

  public deleteUserByID(id : Number) : Observable<any> {
    const url = `${AppConstants.baseUsuario()}/${id}`;
    return this.http.delete(url);
  }

  public findUserByName(nome : String) : Observable<any> {
    const url = `${AppConstants.baseUsuario()}?nome=${nome}`;
    return this.http.get<Usuario[]>(url);
  }

  public findUserByID(id : String) : Observable<any>{
    const url = `${AppConstants.baseUsuario()}/${id}`;
    const cabecalho = new HttpHeaders().set("X-API-Version","v1"); /* Setando Authorization no Header*/
    return this.http.get<Usuario>(url, {headers : cabecalho});
  }

  public registerUser(usuario : Usuario) : Observable<any> {
    return this.http.post(AppConstants.baseUsuario(), usuario,{observe : "response"})
  }

  public updateUser(usuario : Usuario) : Observable<any> {
    return this.http.put(AppConstants.baseUsuario(), usuario)
  }

  public userAuthenticated() {
    return localStorage.getItem("token") !== null;
  }
}
