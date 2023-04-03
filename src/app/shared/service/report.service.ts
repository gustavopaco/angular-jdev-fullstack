import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_REPORT} from "../constant/API";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private requestApi: HttpClient) { }

  downloadBasicReport(): Observable<any> {
    return this.requestApi.get(API_REPORT)
  }
}
