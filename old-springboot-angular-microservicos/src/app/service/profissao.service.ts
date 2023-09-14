import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../app-constants";

@Injectable({
  providedIn: 'root'
})
export class ProfissaoService {

  constructor(private http : HttpClient) { }

  public getProfissoes() : Observable<any> {
    return this.http.get(AppConstants.baseProfissao())
  }
}
