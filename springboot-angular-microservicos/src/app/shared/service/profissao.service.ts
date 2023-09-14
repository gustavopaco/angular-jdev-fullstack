import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {Profissao} from "../model/Profissao";
import {API_PROFISSAO} from "../constant/API";

@Injectable({
  providedIn: 'root'
})
export class ProfissaoService {

  constructor(private requestApi: HttpClient) { }

  getAllProfissoes(): Observable<Profissao[]> {
    return this.requestApi.get<Profissao[]>(API_PROFISSAO).pipe(take(1))
  }
}
