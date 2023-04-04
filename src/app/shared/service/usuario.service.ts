import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CHART, API_REGISTER, API_USUARIO} from "../constant/API";
import {Observable, take} from "rxjs";
import {Usuario} from "../model/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioEvent = new EventEmitter<Usuario>();

  constructor(private requestApi: HttpClient) { }

  generateChart(): Observable<any> {
    return this.requestApi.get(API_CHART);
  }

  getAllUsuarios(): Observable<any> {
    return this.requestApi.get<any>(API_USUARIO).pipe(take(1))
  }

  getUsuariosPage(currentPage: number, nome?: string, sortedBy?: string[]): Observable<any> {
    if (nome != undefined && nome != '') {
      if (sortedBy != undefined) {
        return this.requestApi.get<any>(`${API_USUARIO}/page`, {params: {page: currentPage, sort: sortedBy}})
      }
      return this.requestApi.get<any>(`${API_USUARIO}/page`, {params: {page: currentPage, nome: nome}})
    }
    if (sortedBy != undefined) {
      return this.requestApi.get<any>(`${API_USUARIO}/page`, {params: {page: currentPage, sort: sortedBy}})
    }
    return this.requestApi.get<any>(`${API_USUARIO}/page`, {params: {page: currentPage}})
  }

  getAllUsuariosByName(nome: string): Observable<Usuario[]> {
    return this.requestApi.get<Usuario[]>(`${API_USUARIO}/listByName/${nome}`).pipe(take(1))
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.requestApi.get<Usuario>(`${API_USUARIO}/${id}`)
  }

  addNewUsuario(usuario: any) {
    return this.requestApi.post(API_REGISTER, usuario);
  }

  updateUsuario(usuario: any) {
    return this.requestApi.put(API_USUARIO, usuario);
  }

  deleteUsuario(id: number) {
    return this.requestApi.delete(`${API_USUARIO}/${id}`).pipe(take(1))
  }

  getUsuarioEmitter() {
    return this.usuarioEvent;
  }
}
