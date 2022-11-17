export class Registro {
  public nombresRegistro: string;
  public apellidosRegistro: string;
  public documentoRegistro: string;
  public correoRegistro: string;
  public telefonoRegistro: string;
  public claveRegistro: string;
  public confirmarClaveRegistro?: string;
  public codTipoDependencia:number;

  constructor(
    nombre: string,
    apellido: string,
    documento: string,
    correo: string,
    telefono:string,
    clave: string,
    codTipoDependencia:number,
  ) {
    this.nombresRegistro = nombre;
    this.apellidosRegistro = apellido;
    this.documentoRegistro = documento;
    this.correoRegistro = correo;
    this.telefonoRegistro=telefono;
    this.claveRegistro = clave;
    this.codTipoDependencia=codTipoDependencia;
  }
}
