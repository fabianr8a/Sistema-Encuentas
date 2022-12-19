export class usuariosRespuestas {
  public codUsuario: number;
  public codPregunta: number;
  public respuestaAbierta: string;
  public respuestaFecha: Date | string;
  public codOpcion?: number;
  public textoOpcion:string

  constructor(
      codiUsuario: number,
      codiPregunta: number,
      resAbierta: string,
      resFecha: Date | string,
      codiOpcion: number,
      textoOpcion:string
  ) {
      this.codUsuario = codiUsuario;
      this.codPregunta = codiPregunta;
      this.respuestaAbierta = resAbierta;
      this.respuestaFecha = resFecha;
      this.codOpcion = codiOpcion;
      this.textoOpcion=textoOpcion
  }
}
