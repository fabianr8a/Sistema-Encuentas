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

  constructor(private http: HttpClient) {}

  public listarEncuestas(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.apiEncuesta);
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

  public listarTipoDependencias(
    codDependencia: number
  ): Observable<TiposDependencia[]> {
    return this.http.get<TiposDependencia[]>(
      `${this.apiTipoDependencias}/${codDependencia}`
    );
  }

  public crearEncuesta(objeto: Encuesta,pregunta:Preguntas): Observable<Encuesta> {
    return this.http.post<Encuesta>(API_CREAR_ENCUESTA, [objeto,pregunta]);
  }



}

