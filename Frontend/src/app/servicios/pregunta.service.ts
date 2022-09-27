import { API_MODIFICAR_PREGUNTA } from './../utilidades/dominios/uris';
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
  constructor(private http: HttpClient) {}


  public seleccionarPregunta(codEncuesta:number):Observable<Preguntas[]>{
    return this.http.get<Preguntas[]>(`${API_SELECCIONAR_PREGUNTA}/ ${codEncuesta}`);
  }

  public modificarPregunta(objPregunta:Preguntas): Observable<Preguntas>{
    return this.http.put<Preguntas>(API_MODIFICAR_PREGUNTA + '/' +  objPregunta.codPregunta, objPregunta);
  }

}
