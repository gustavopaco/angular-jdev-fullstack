import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../app-constants";
import {Observable} from "rxjs";
import {Telefone} from "../model/telefone";

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {

  constructor(private http : HttpClient) { }

  public addNewPhone(usuarioID : Number,telefone : Telefone) : Observable<any> {
    const url = `${AppConstants.baseTelefone()}?usuarioID=${usuarioID}`;
    return this.http.post(url,telefone);
  }

  public deletarTelefone(id : Number) : Observable<any> {
    return this.http.delete(`${AppConstants.baseTelefone()}/${id}`);
  }
}
