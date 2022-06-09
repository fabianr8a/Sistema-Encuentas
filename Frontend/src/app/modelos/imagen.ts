export class Imagen {
  public codImagen: number;
  public nombrepublicoImagen: string;
  public nombreprivadoImagen: string;
  public tamanoImagen: string;
  public tipoImagen: string;
  public base64Imagen: string;

  constructor(
    cod: number,
    nomPub: string,
    nomPri: string,
    tam: string,
    tip: string,
    base: string
  ) {
    this.codImagen = cod;
    this.nombrepublicoImagen = nomPub;
    this.nombreprivadoImagen = nomPri;
    this.tamanoImagen = tam;
    this.tipoImagen = tip;
    this.base64Imagen = base;
  }
}
