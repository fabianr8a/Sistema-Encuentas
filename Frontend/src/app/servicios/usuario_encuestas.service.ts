import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encuesta } from '../modelos/encuesta';
import { Observable } from 'rxjs';
import { API_LISTAR_ENCUESTAS } from '../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class UsuarioEncuestaService {
  public apiListarEncuesta: string = API_LISTAR_ENCUESTAS;


  constructor(private http: HttpClient) {}

  public listarEncuestasUsuarios(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.apiListarEncuesta);
  }
}
