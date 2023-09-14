import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../app-constants";
import {Report} from "../model/report";

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http : HttpClient) { }

  public downloadReport(reportFormat : String) : Observable<any> {
    const url = `${AppConstants.baseUsuario()}/report?reportFormat=${reportFormat}`;
    return this.http.get(url, {responseType : "text"});
  }

  public advancedReport(reportFormat : String, report: Report) : Observable<any> {
    const url = `${AppConstants.baseUsuario()}/report?reportFormat=${reportFormat}`;
    return this.http.post(url,report ,{responseType : "text"});
  }
}
