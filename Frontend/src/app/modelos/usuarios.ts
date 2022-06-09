export class Usuarios {
  public codUsuario: number;
  public nombresUsuario: string;
  public documentoUsuario:string;
  public apellidosUsuario: string;
  public correoUsuario:string;
  public nombreRol:string;
  public telefonoUsuario:string;
  public estadoUsuario:number;
  public nickName:string;
  public claveUsuario:string;
  public reclaveUsuario:string;
  public nombreFoto:string;
  public fotoUsuario: string;
  public tipoDocumentoUsuario: number;


  constructor(
    cod:number,
    doc:string,
    nomUsu:string,
    apeUsu:string,
    correoUsu:string,
    rolUsu:string,
    teleUsu:string,
    estado:number,
    fotoUsu:string,
    ingreso:string,
    clave:string,
    reclave:string,
    nomFoto:string,
    tipoDocumento:number,


  ){
    this.codUsuario=cod;
    this.documentoUsuario=doc;
    this.nombresUsuario=nomUsu;
    this.apellidosUsuario=apeUsu;
    this.correoUsuario=correoUsu;
    this.telefonoUsuario=teleUsu;
    this.nickName=ingreso;
    this.fotoUsuario=fotoUsu;
    this.claveUsuario=clave;
    this.reclaveUsuario=reclave;
    this.nombreRol=rolUsu;
    this.estadoUsuario=estado;
    this.nombreFoto=nomFoto;
    this.tipoDocumentoUsuario = tipoDocumento;
}
}
