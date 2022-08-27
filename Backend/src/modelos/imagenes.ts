class Imagen {
  public codImagen: number;
  public nombrePublicoImagen: string;
  public nombrePrivadoImagen: string;
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
    this.nombrePublicoImagen = nomPub;
    this.nombrePrivadoImagen = nomPri;
    this.tipoImagen = tip;
    this.base64 = ba64;
  }
}

export default Imagen;
