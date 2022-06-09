import { Usuarios } from './../modelos/usuarios';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_USUARIO } from './../utilidades/dominios/uris';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public apiUsuario: string = API_USUARIO;

  constructor(private http: HttpClient) {}

  public cargarUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.apiUsuario);
  }

}
