export class RespuestaAcceso {
  public tokenFullStack: string;
  public foticoFullStack: string;

  constructor(tok: string, fot: string){
    this.tokenFullStack = tok;
    this.foticoFullStack = fot;
  }
}
