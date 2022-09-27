import { Opciones } from "./opciones";

export class Preguntas{
  public codPregunta:number;
  public codTipoPregunta:number;
  public descripcionPregunta:any;
  public codEncuesta:number;
  public arregloOpciones:Opciones[];



  constructor(
    codPregunta:number,
    codTipoPregunta:number,
    descripcionPregunta:any,
    codEncuesta:number,
    arregloOpciones:Opciones[],
  ){
    this.codPregunta=codPregunta;
    this.codTipoPregunta=codTipoPregunta;
    this.descripcionPregunta=descripcionPregunta;
    this.codEncuesta=codEncuesta;
    this.arregloOpciones=arregloOpciones;

  }
}
