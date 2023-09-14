import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Telefone} from "../model/Telefone";
import {Observable} from "rxjs";
import {API_TELEFONE} from "../constant/API";

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {

  constructor(private requestApi: HttpClient) { }

  addTelefone(telefone: Telefone): Observable<Telefone> {
    return this.requestApi.post(API_TELEFONE, telefone)
  }

  deleteTelefone(id: number): Observable<any> {
    return this.requestApi.delete(`${API_TELEFONE}/${id}`)
  }
}
