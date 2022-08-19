export class TipoPreguntas{
  public codTipoPregunta:number;
  public nombreTipoPregunta:string;

  constructor(
    codPregunta:number,
    nomPregunta:string
  ){
    this.codTipoPregunta=codPregunta;
    this.nombreTipoPregunta=nomPregunta
  }
}
