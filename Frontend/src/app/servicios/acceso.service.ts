import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Acceso } from '../modelos/acceso';
import * as urls from '../utilidades/dominios/uris';
import { RespuestaAcceso } from '../modelos/respuesta-acceso';
import { TOKEN_SISTEMA } from '../utilidades/dominios/sesiones';

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
    return new Acceso(0, '', '', '', 0, 0);
  }

  public obtenerAcceso(): Acceso {
    return this.objAcceso;
  }

  // Lógica de negocio
  public salir(): void {
    localStorage.removeItem(TOKEN_SISTEMA);
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
        this.objAcceso.codUsuario = objetoVerificado.datos[0].codUsuario;
        this.objAcceso.correoAcceso = objetoVerificado.datos[0].correoAcceso;
        this.objAcceso.nombreRol = objetoVerificado.datos[0].nombreRol;
        this.objAcceso.nombresUsuario =objetoVerificado.datos[0].nombresUsuario;
        this.objAcceso.apellidosUsuario =objetoVerificado.datos[0].apellidosUsuario;
        this.objAcceso.estadoRol=objetoVerificado.datos[0].estadoRol;
        this.objAcceso.estadoUsuario = objetoVerificado.datos[0].estadoUsuario;
        return true;
      }
      catch (error) {
        return false;
      }
    }
    return false;
  }
}
