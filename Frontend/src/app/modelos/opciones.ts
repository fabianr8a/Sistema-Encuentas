export class Opciones {
  public codOpcion: number;
  public codPregunta: number;
  public textoOpcion: string;

  constructor(codOpcion: number, codPregunta: number, textoOpcion: string) {
    this.codOpcion = codOpcion;
    this.codPregunta = codPregunta;
    this.textoOpcion = textoOpcion;
  }
}
