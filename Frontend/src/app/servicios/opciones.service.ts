import { Opciones } from 'src/app/modelos/opciones';
import {
  API_LISTAR_OPCIONES,
  API_ELIMINAR_OPCIONES,
  API_SELECCIONAR_OPCION,
  API_MODIFICAR_OPCIONES,
} from './../utilidades/dominios/uris';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpcionesService {
  public apiListarOpciones: string = API_LISTAR_OPCIONES;
  public apiEliminarOpciones: string = API_ELIMINAR_OPCIONES;
  public apiSeleccionarOpcion: string = API_SELECCIONAR_OPCION;
  public apiModificarOpcion: string = API_MODIFICAR_OPCIONES;
  constructor(private http: HttpClient) {}

  public listarOpciones(codPregunta: number): Observable<Opciones[]> {
    return this.http.get<Opciones[]>(
      `${this.apiListarOpciones}/ ${codPregunta}`
    );
  }

  public eliminarOpciones(codOpcion: number): Observable<Opciones> {
    return this.http.delete<Opciones>(
      this.apiEliminarOpciones + '/' + codOpcion
    );
  }

  public seleccionarOpcion(codOpcion: number): Observable<Opciones> {
    return this.http.get<Opciones>(
      `${this.apiSeleccionarOpcion}/${codOpcion}`
    );
  }

  public modificarOpcion(objOpcion: Opciones): Observable<Opciones> {
    return this.http.put<Opciones>(
      this.apiModificarOpcion + '/' + objOpcion.codOpcion,
      objOpcion
    );
  }
}
