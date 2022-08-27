export class Registro {
  public nombresRegistro: string;
  public apellidosRegistro: string;
  public documentoRegistro: string;
  public correoRegistro: string;
  public claveRegistro: string;
  public confirmarClaveRegistro?: string;

  constructor(
    nombre: string,
    apellido: string,
    documento: string,
    correo: string,
    clave: string,
    imagen: string
  ) {
    this.nombresRegistro = nombre;
    this.apellidosRegistro = apellido;
    this.documentoRegistro = documento;
    this.correoRegistro = correo;
    this.claveRegistro = clave;
  }
}
