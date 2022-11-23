import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuariosRespuestas } from '../modelos/usuarios-respuestas';
import { API_RESPUESTAS } from '../utilidades/dominios/uris';


@Injectable({
  providedIn: 'root',
})
export class ResultadosEncuestasService {
  public apiRespuestas: string = API_RESPUESTAS;

  constructor(private http: HttpClient) {}

  public listarRespuestas(codPregunta:any ): Observable<usuariosRespuestas[]> {
    return this.http.get<usuariosRespuestas[]>(this.apiRespuestas + '/' + codPregunta);
  }
}
