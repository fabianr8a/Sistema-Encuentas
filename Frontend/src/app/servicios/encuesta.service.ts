import { API_ENCUESTA_EVENTOS } from './../utilidades/dominios/uris';
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

  constructor(private htttp:HttpClient){}

  public listarEncuestas():Observable<Encuestas[]>{
    return this.htttp.get<Encuestas[]>(this.apiEncuesta);
  }

  public listarEventos():Observable<TipoEventos[]>{
    return this.htttp.get<TipoEventos[]>(this.apiEncuestaEvento);
  }
}


