import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encuesta } from '../modelos/encuesta';
import { Observable } from 'rxjs';
import { API_LISTAR_ENCUESTAS, API_RESPONDER_ENCUESTA, API_VALIDAR_RESPUESTAS} from '../utilidades/dominios/uris';
import { usuariosRespuestas } from '../modelos/usuarios-respuestas';

@Injectable({
  providedIn: 'root',
})
export class UsuarioEncuestaService {
  public apiListarEncuesta: string = API_LISTAR_ENCUESTAS;
  public apiResponderEncuesta : string = API_RESPONDER_ENCUESTA;
  public apiValidarRespuestas:string =API_VALIDAR_RESPUESTAS;

  constructor(private http: HttpClient) {}

  public listarEncuestasUsuarios(codUsuario:number): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.apiListarEncuesta + '/' + codUsuario);
  }

  public responderEncuesta(respuestas: usuariosRespuestas[],codEncuesta:number): Observable<Encuesta> {
    return this.http.post<Encuesta>(this.apiResponderEncuesta, [respuestas,codEncuesta]);
  }

  public validarOpcionResponder(codigoEncuesta:number): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.apiValidarRespuestas + '/' + codigoEncuesta);
  }

}
