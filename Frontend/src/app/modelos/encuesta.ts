export class Encuesta {
  public codEncuesta: number;
  public codTipoDependencia: number;
  public codDependencia: number;
  public codTipoEvento: number;
  public nombreEncuesta: string;
  public fechaCreacionEncuesta: Date | string;
  public fechaCierreEncuesta: Date | string;
  public descripcionEncuesta: string;
  public codUsuario: number;
  public nombreTipoEvento: string;
  public nombreTipoDependencia: string;


  constructor(
    codEncuesta: number,
    codTipoDependencia: number,
    codDependencia: number,
    codTipoEvento: number,
    nombreEncuesta: string,
    fechaCreacionEncuesta: Date | string,
    fechaCierreEncuesta: Date | string,
    descripcionEncuesta: string,
    codUsuario: number,
    nombreTipoEvento: string,
    nombreTipoDependencia: string
  ) {
    this.codEncuesta = codEncuesta;
    this.codTipoDependencia = codTipoDependencia;
    this.codDependencia = codDependencia;
    this.codTipoEvento = codTipoEvento;
    this.nombreEncuesta = nombreEncuesta;
    this.fechaCreacionEncuesta = fechaCreacionEncuesta;
    this.fechaCierreEncuesta = fechaCierreEncuesta;
    this.descripcionEncuesta = descripcionEncuesta;
    this.codUsuario = codUsuario;
    this.nombreTipoEvento = nombreTipoEvento;
    this.nombreTipoDependencia = nombreTipoDependencia;
  }
}
