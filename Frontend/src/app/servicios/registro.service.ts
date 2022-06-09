import { Imagen } from './../modelos/imagen';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registro } from '../modelos/registro';
import { API_REGISTRO } from '../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private http: HttpClient) {}
  public enviarRegistro(
    objeto: Registro,
    imagen: Imagen
  ): Observable<Registro> {
    return this.http.post<Registro>(API_REGISTRO, [objeto, imagen]);
  }
}
