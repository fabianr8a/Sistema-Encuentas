export class RespuestaAcceso {
  public tokenFullStack: string;
  public nombreRol?: string|any;

  constructor(tok: string){
    this.tokenFullStack = tok;
  }
}
