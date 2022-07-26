import { API_ENCUESTA_EVENTOS, API_ENCUESTA_BUSCAR } from './../utilidades/dominios/uris';
import { TipoEventos } from './../modelos/tipo_eventos';
import { Encuestas } from "../modelos/encuestas";
import { Observable } from "rxjs";
import { API_ENCUESTA } from "../utilidades/dominios/uris";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root',
})

export class EncuestaService{
  public apiEncuesta:string=API_ENCUESTA;
  public apiEncuestaEvento:string=API_ENCUESTA_EVENTOS;
  public apiBuscarEncuesta:string=API_ENCUESTA_BUSCAR;

  constructor(private htttp:HttpClient){}

  public listarEncuestas():Observable<Encuestas[]>{
    return this.htttp.get<Encuestas[]>(this.apiEncuesta);
  }

  public listarEventos():Observable<TipoEventos[]>{
    return this.htttp.get<TipoEventos[]>(this.apiEncuestaEvento);
  }

  public buscarEncuesta(nombreEncuesta:string):Observable<Encuestas[]>{
    return this.htttp.post<Encuestas[]>(this.apiBuscarEncuesta,{nombreEncuesta:nombreEncuesta});
  }
}


