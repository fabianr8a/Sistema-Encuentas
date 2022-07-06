export class Acceso {
  public codUsuario: number;
  public correoAcceso: string;
  public claveAcceso: string;

  public reclaveAcceso?: string;
  public nombreRol: string;
  public nombresUsuario?: string;
  public apellidosUsuario?: string;

  constructor(cod: number, cor: string, cla: string, rol:string,){
    this.codUsuario = cod;
    this.correoAcceso = cor;
    this.claveAcceso = cla;
    this.nombreRol=rol;
  }
}
