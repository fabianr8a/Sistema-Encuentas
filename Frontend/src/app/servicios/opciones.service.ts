import { Opciones } from 'src/app/modelos/opciones';
import { API_SELECCIONAR_OPCIONES, API_ELIMINAR_OPCIONES } from './../utilidades/dominios/uris';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class OpcionesService {
  public apiSeleccionarOpciones:string=API_SELECCIONAR_OPCIONES;
  public apiEliminarOpciones:string= API_ELIMINAR_OPCIONES;
  constructor(private http: HttpClient) {}


  public listarOpciones(codPregunta:number):Observable<Opciones[]>{
    return this.http.get<Opciones[]>(`${this.apiSeleccionarOpciones}/ ${codPregunta}`);
  }

  public eliminarOpciones (codOpcion:number):Observable<Opciones>{
    return this.http.delete<Opciones>(this.apiEliminarOpciones + '/' + codOpcion);
  }




}
