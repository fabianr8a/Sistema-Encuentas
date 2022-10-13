import {
  API_MODIFICAR_PREGUNTA,
  API_ELIMINAR_PREGUNTA,
  API_CREAR_PREGUNTA,
} from './../utilidades/dominios/uris';
import { Encuesta } from './../modelos/encuesta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preguntas } from '../modelos/preguntas';
import { API_SELECCIONAR_PREGUNTA } from '../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  public apiSeleccionarPregunta: string = API_SELECCIONAR_PREGUNTA;
  public apiCrearPregunta: string = API_CREAR_PREGUNTA;
  public apiModificarPregunta: string = API_MODIFICAR_PREGUNTA;
  public apiEliminarPregunta: string = API_ELIMINAR_PREGUNTA;
  constructor(private http: HttpClient) {}

  public seleccionarPregunta(codEncuesta: number): Observable<Preguntas[]> {
    return this.http.get<Preguntas[]>(this.apiSeleccionarPregunta + '/' + codEncuesta);
  }

  public crearPregunta(preguntas: Preguntas[]): Observable<Preguntas> {
    return this.http.post<Preguntas>(this.apiCrearPregunta, [preguntas]);
  }

  public modificarPregunta(objPregunta: Preguntas): Observable<Preguntas> {
    return this.http.put<Preguntas>(
      this.apiModificarPregunta + '/' + objPregunta.codPregunta, objPregunta);
  }

  public eliminarPregunta(codPregunta: number): Observable<Preguntas> {
    return this.http.delete<Preguntas>(
      this.apiEliminarPregunta + '/' + codPregunta
    );
  }
}
