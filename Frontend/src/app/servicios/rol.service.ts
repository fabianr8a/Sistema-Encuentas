import { Rol } from './../modelos/rol';
import { Observable } from 'rxjs';
import {
  API_ROL,
  API_ROL_CREAR,
  API_ROL_ELIMINAR,
  API_ROL_BUSCAR,
} from './../utilidades/dominios/uris';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  public apiRol: string = API_ROL;
  public apiRolCrear: string = API_ROL_CREAR;
  public apiRolEliminar: string = API_ROL_ELIMINAR;
  public apiRolBuscar: string = API_ROL_BUSCAR;

  constructor(private http: HttpClient) {}

  public cargarRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiRol);
  }

  public eliminarRol(codRol: number): Observable<Rol> {
    return this.http.delete<Rol>(this.apiRolEliminar + '/' + codRol);
  }

  public crearRol(objRol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiRolCrear, objRol);
  }

  public buscarRoles(nombreRol: string): Observable<Rol[]> {
    return this.http.post<Rol[]>(this.apiRolBuscar, {nombreRol:nombreRol});
  }
}
