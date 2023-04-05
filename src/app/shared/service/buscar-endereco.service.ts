import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_VIA_CEP_URL} from "../constant/constants";
import {Observable, take} from "rxjs";
import {EnderecoDto} from "../model/EnderecoDto";

@Injectable({
  providedIn: 'root'
})
export class BuscarEnderecoService {

  constructor(private httpClient: HttpClient) {
  }

  getEndereco(cep: string): Observable<EnderecoDto> {
    return this.httpClient.get<EnderecoDto>(`${API_VIA_CEP_URL}${cep}/json`)
      .pipe(
        take(1)
      )
  }
}
