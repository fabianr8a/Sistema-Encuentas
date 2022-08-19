export class Acceso {
  public codUsuario: number;
  public correoAcceso: string;
  public claveAcceso: string;
  public nombreRol: string;
  public nombresUsuario?: string;
  public apellidosUsuario?: string;
  public estadoRol:number;

  constructor(cod: number, cor: string, cla: string, rol: string, estadoRol:number) {
    this.codUsuario = cod;
    this.correoAcceso = cor;
    this.claveAcceso = cla;
    this.nombreRol = rol;
    this.estadoRol=estadoRol;
  }
}
