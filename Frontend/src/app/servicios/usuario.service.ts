import { Usuarios } from './../modelos/usuarios';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  API_USUARIO,
  API_USUARIO_CREAR,
  API_USUARIO_BUSCAR_USUARIO,
  API_USUARIO_MODIFICAR,
  API_USUARIO_BUSCAR_ACCESO,
  API_USUARIO_MODIFICAR_ACCESO,
  API_USUARIO_MODIFICAR_IMAGEN,
  API_USUARIO_BUSCAR_IMAGEN
 } from './../utilidades/dominios/uris';
import { Injectable } from '@angular/core';
import { Acceso } from '../modelos/acceso';
import { Imagen } from '../modelos/imagen';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  public cargarUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(API_USUARIO);
  }

  public crearUsuarios(objUsu: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(API_USUARIO_CREAR, objUsu);
  }

  public buscarUnUsuario(idUsu: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(API_USUARIO_BUSCAR_USUARIO + '/' + idUsu);
  }

  public buscarUnAcceso(idUsu: number): Observable<Acceso> {
    return this.http.get<Acceso>(API_USUARIO_BUSCAR_ACCESO + '/' + idUsu);
  }

  public buscarUnaImagen(idUsu: number): Observable<Imagen> {
    return this.http.get<Imagen>(API_USUARIO_BUSCAR_IMAGEN + '/' + idUsu);
  }

  public modificarUsuario(objUsu: Usuarios): Observable<Usuarios>{
    return this.http.put<Usuarios>(API_USUARIO_MODIFICAR + '/' +  objUsu.codUsuario, objUsu);
  }

  public modificarAcceso(objUsu: Usuarios ,objAcce: Acceso): Observable<Acceso>{
    return this.http.put<Acceso>(API_USUARIO_MODIFICAR_ACCESO + '/' +  objUsu.codUsuario, objAcce);
  }

  public modificarImagen(objUsu: Usuarios ,objIma: Imagen): Observable<Imagen>{
    return this.http.put<Imagen>(API_USUARIO_MODIFICAR_IMAGEN + '/' +  objUsu.codUsuario, objIma);
  }

}
