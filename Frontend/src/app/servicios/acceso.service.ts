import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Acceso } from '../modelos/acceso';
import * as urls from '../utilidades/dominios/uris';
import { RespuestaAcceso } from '../modelos/respuesta-acceso';
import { FOTO_SISTEMA, TOKEN_SISTEMA } from '../utilidades/dominios/sesiones';

import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  public objAcceso: Acceso;
  public urlInicioSesion: string;

  constructor(private http: HttpClient, private router: Router) {
    this.objAcceso = this.inicializarAcceso();
    this.urlInicioSesion = urls.API_INICIO;
  }

  // Métodos obligatorios
  public inicializarAcceso(): Acceso {
    return new Acceso(0, '', '');
  }

  public obtenerAcceso(): Acceso {
    return this.objAcceso;
  }

  // Lógica de negocio
  public salir(): void {
    localStorage.removeItem(TOKEN_SISTEMA);
    localStorage.removeItem(FOTO_SISTEMA);
    this.router.navigate(['/land/public/login']);
  }

  public obtenerToken(): string {
    return localStorage.getItem(TOKEN_SISTEMA) as string;
  }

  public iniciarSesion(miAcceso: Acceso): Observable<RespuestaAcceso> {
    return this.http.post<RespuestaAcceso>(this.urlInicioSesion, miAcceso);
  }

  public verificarUsuario(): boolean {
    if (localStorage.getItem(TOKEN_SISTEMA)) {
      try {
        const objetoVerificado: any = jwtDecode(this.obtenerToken());
        this.objAcceso.codUsuario = objetoVerificado.codUsuario;
        this.objAcceso.nombreRol = objetoVerificado.nombreRol;
        this.objAcceso.correoAcceso = objetoVerificado.correoUsuario;
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
