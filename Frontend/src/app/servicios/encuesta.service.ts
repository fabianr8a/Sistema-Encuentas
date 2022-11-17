import { Preguntas } from './../modelos/preguntas';
import { TiposDependencia } from './../modelos/tipo_dependencias';
import { Dependencias } from './../modelos/dependencias';
import { TipoPreguntas } from './../modelos/tipo_preguntas';
import {
  API_ENCUESTA_EVENTOS,
  API_ENCUESTA_TIPO_PREGUNTAS,
  API_ENCUESTA_DEPENDENCIAS,
  API_ENCUESTA_TIPO_DEPENDENCIAS,
  API_CREAR_ENCUESTA,
  API_MODIFICAR_ENCUESTA,
  API_ENCUESTA_SELECCIONADA_MODIFICAR,
} from './../utilidades/dominios/uris';
import { TipoEventos } from './../modelos/tipo_eventos';
import { Encuesta } from '../modelos/encuesta';
import { Observable } from 'rxjs';
import { API_ENCUESTA } from '../utilidades/dominios/uris';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  public apiEncuesta: string = API_ENCUESTA;
  public apiEncuestaEvento: string = API_ENCUESTA_EVENTOS;
  public apiTipoPregunta: string = API_ENCUESTA_TIPO_PREGUNTAS;
  public apiDependencias: string = API_ENCUESTA_DEPENDENCIAS;
  public apiTipoDependencias: string = API_ENCUESTA_TIPO_DEPENDENCIAS;
  public apiCrearEncuesta:string=API_CREAR_ENCUESTA;
  public apiModificarEncuesta:string=API_MODIFICAR_ENCUESTA;
  public apiSeleccionarEncuestaModificar:string=API_ENCUESTA_SELECCIONADA_MODIFICAR;

  constructor(private http: HttpClient) {}

  public listarEncuestas(codUsuario:number): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.apiEncuesta + '/' +codUsuario);
  }

  public listarEventos(): Observable<TipoEventos[]> {
    return this.http.get<TipoEventos[]>(this.apiEncuestaEvento);
  }

  public listarTipoPreguntas(): Observable<TipoPreguntas[]> {
    return this.http.get<TipoPreguntas[]>(this.apiTipoPregunta);
  }

  public listarDependencias(): Observable<Dependencias[]> {
    return this.http.get<Dependencias[]>(this.apiDependencias);
  }

  public listarTipoDependencias(): Observable<TiposDependencia[]> {
    return this.http.get<TiposDependencia[]>(
      this.apiTipoDependencias
    );
  }

  public crearEncuesta(objeto: Encuesta, preguntas: Preguntas[]): Observable<Encuesta> {
    return this.http.post<Encuesta>(this.apiCrearEncuesta, [objeto,preguntas]);
  }

  public seleccionarEncuestaModificar(idEncuesta: number): Observable<Encuesta> {
    return this.http.get<Encuesta>(this.apiSeleccionarEncuestaModificar + '/' + idEncuesta);
  }

  public modificarEncuesta(objEncuesta:Encuesta): Observable<Encuesta>{
    return this.http.put<Encuesta>(this.apiModificarEncuesta+'/'+ objEncuesta.codEncuesta, objEncuesta);
  }



}

