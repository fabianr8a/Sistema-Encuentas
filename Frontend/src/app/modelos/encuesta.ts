export class Encuesta {
  public codEncuesta: number;
  public codDependencia: number;
  public codTipoEvento: number;
  public nombreEncuesta: string;
  public descripcionEncuesta: string;
  public fechaCreacionEncuesta: Date | string;
  public fechaCierreEncuesta: Date | string;
  public codTipoPregunta: number;
  public nombreTipoEvento:string;

  constructor(
    codEncuesta: number,
    codDependencia: number,
    codTipoEvento: number,
    nombreEncuesta: string,
    descripcionEncuesta: string,
    fechaCreacionEncuesta: Date | string,
    fechaCierreEncuesta: Date | string,
    codTipoPregunta: number,
    nombreTipoEvento:string,
  ) {
    this.codEncuesta = codEncuesta;
    this.codDependencia = codDependencia;
    this.codTipoEvento = codTipoEvento;
    this.nombreEncuesta = nombreEncuesta;
    this.descripcionEncuesta = descripcionEncuesta;
    this.fechaCreacionEncuesta = fechaCreacionEncuesta;
    this.fechaCierreEncuesta = fechaCierreEncuesta;
    this.codTipoPregunta = codTipoPregunta;
    this.nombreTipoEvento=nombreTipoEvento;
  }
}
