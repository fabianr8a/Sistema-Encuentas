export class Imagen {
  public codImagen: number;
  public nombrepublicoImagen: string;
  public nombreprivadoImagen: string;
  public tipoImagen: string;
  public base64: string;


  constructor(
    cod: number,
    nomPub: string,
    nomPri: string,
    tip: string,
    ba64: string,
  ) {
    this.codImagen = cod;
    this.nombrepublicoImagen = nomPub;
    this.nombreprivadoImagen = nomPri;
    this.tipoImagen = tip;
    this.base64 = ba64;
  }
}
