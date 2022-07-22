export class Imagen {
  public codImagen: number;
  public nombrepublicoImagen: string;
  public nombreprivadoImagen: string;
  public tipoImagen: string;


  constructor(
    cod: number,
    nomPub: string,
    nomPri: string,
    tip: string,
  ) {
    this.codImagen = cod;
    this.nombrepublicoImagen = nomPub;
    this.nombreprivadoImagen = nomPri;
    this.tipoImagen = tip;
  }
}
