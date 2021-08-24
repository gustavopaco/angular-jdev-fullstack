import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../app-constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {

  constructor(private http : HttpClient) { }

  public deletarTelefone(id : Number) : Observable<any> {
    return this.http.delete(`${AppConstants.baseTelefone()}/${id}`);
  }
}
