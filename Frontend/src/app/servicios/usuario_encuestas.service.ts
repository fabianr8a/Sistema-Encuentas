import { API_LISTAR_TIPO_DEPENDENCIAS } from './../utilidades/dominios/uris';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encuesta } from '../modelos/encuesta';
import { Observable } from 'rxjs';
import { API_LISTAR_ENCUESTAS } from '../utilidades/dominios/uris';
import { TiposDependencia } from '../modelos/tipo_dependencias';

@Injectable({
  providedIn: 'root',
})
export class UsuarioEncuestaService {
  public apiListarEncuesta: string = API_LISTAR_ENCUESTAS;
  public apiListarTipoDependencias:string=API_LISTAR_TIPO_DEPENDENCIAS;

  constructor(private http: HttpClient) {}

  public listarEncuestasUsuarios(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.apiListarEncuesta);
  }

  public listarTipoDependencias(): Observable<TiposDependencia[]> {
    return this.http.get<TiposDependencia[]>(this.apiListarTipoDependencias);
  }

}
