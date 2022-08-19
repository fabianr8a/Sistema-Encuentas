export class TiposDependencia{
  public codTipoDependencia:number;
  public codDependencia:number;
  public nombreTipoDependencia:string;

  constructor(
    codTipoDepen:number,
    codDepen:number,
    nomTipoDepen:string
  ){
    this.codTipoDependencia=codTipoDepen;
    this.codDependencia=codDepen;
    this.nombreTipoDependencia=nomTipoDepen
  }
}
