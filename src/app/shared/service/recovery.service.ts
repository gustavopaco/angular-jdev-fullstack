import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_RECOVERY} from "../constant/API";
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  constructor(private requestApi: HttpClient) { }

  sendEmail(formulario: any) {
    return this.requestApi.post(API_RECOVERY, formulario).pipe(take(1))
  }

  validateTokenExpired(token: any): Observable<boolean> {
    return this.requestApi.post<boolean>(`${API_RECOVERY}/validateTokenExpired`, token)
  }

  resetPassword(formulario: any): Observable<void> {
    return this.requestApi.post<void>(`${API_RECOVERY}/resetPassword`, formulario)
  }
}
