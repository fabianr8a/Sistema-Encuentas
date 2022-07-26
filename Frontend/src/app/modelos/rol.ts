export class Rol {
  public codRol: number;
  public nombreRol: string;
  public estadoRol: number;
  public cantUsuarios: number;

  constructor(cod: number, nom: string, est: number, can: number){
    this.codRol = cod;
    this.nombreRol = nom;
    this.estadoRol = est;
    this.cantUsuarios = can;
  }
}


