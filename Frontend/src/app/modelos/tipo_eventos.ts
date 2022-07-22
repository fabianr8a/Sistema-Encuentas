export class TipoEventos{
  public codTipoEvento:number;
  public nombreTipoEvento:string;

  constructor(
    codEven:number,
    nomEven:string
  ){
    this.codTipoEvento=codEven;
    this.nombreTipoEvento=nomEven
  }
}
