export class Encuestas {
  public codEncuesta: number;
  public nombreEncuesta: string;
  public fechaCreacionEncuesta: Date|string;
  public fechaCierreEncuesta: Date|string;
  public descripcionEncuesta: string;
  public nombreTipoEvento: string;
  public nombreTipoDependencia: string;

  constructor(
    cod: number,
    nomEncuesta: string,
    fechaCreacion: Date|string,
    fechaCierre: Date|string,
    descripcion: string,
    nomTipoEvento: string,
    nomTipoDependencia: string
  ) {
    this.codEncuesta = cod;
    this.nombreEncuesta = nomEncuesta;
    this.fechaCreacionEncuesta = fechaCreacion;
    this.fechaCierreEncuesta = fechaCierre;
    this.descripcionEncuesta = descripcion;
    this.nombreTipoEvento = nomTipoEvento;
    this.nombreTipoDependencia = nomTipoDependencia;
  }
}
