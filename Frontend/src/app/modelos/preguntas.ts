export class Preguntas{
  public codPregunta:number;
  public codTipoPregunta:number;
  public descripcionPregunta:string
  public codEncuesta:number;

  constructor(
    codPregunta:number,
    codTipoPregunta:number,
    descripcionPregunta:string,
    codEncuesta:number,
  ){
    this.codPregunta=codPregunta;
    this.codTipoPregunta=codTipoPregunta;
    this.descripcionPregunta=descripcionPregunta;
    this.codEncuesta=codEncuesta;

  }
}
