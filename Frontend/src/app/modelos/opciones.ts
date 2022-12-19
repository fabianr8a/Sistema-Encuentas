export class Opciones {
  public codOpcion: number;
  public codPregunta: number;
  public textoOpcion: string;
  public contador:number;

  constructor(codOpcion: number, codPregunta: number, textoOpcion: string, contador:number) {
    this.codOpcion = codOpcion;
    this.codPregunta = codPregunta;
    this.textoOpcion = textoOpcion;
    this.contador=contador
  }
}
