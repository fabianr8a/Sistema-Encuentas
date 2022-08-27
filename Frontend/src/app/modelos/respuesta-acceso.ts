export class RespuestaAcceso {
  public tokenFullStack: string;
  public nombreRol?: string|any;
  public estadoRol?: number|any;

  constructor(tok: string){
    this.tokenFullStack = tok;
  }
}
