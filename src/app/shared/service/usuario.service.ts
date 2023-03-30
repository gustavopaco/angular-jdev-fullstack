import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_REGISTER, API_USUARIO} from "../constant/API";
import {Observable, take} from "rxjs";
import {Usuario} from "../model/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioEvent = new EventEmitter<Usuario>();

  constructor(private requestApi: HttpClient) { }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.requestApi.get<Usuario[]>(API_USUARIO).pipe(take(1))
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
