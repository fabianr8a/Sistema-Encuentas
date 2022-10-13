export class Usuarios {
  public codUsuario: number;
  public codRol: number;
  public nombresUsuario: string;
  public documentoUsuario:string;
  public apellidosUsuario: string;
  public correoAcceso:string;
  public nombreRol:string;
  public telefonoUsuario:string;
  public estadoUsuario:number;
  public claveUsuario:string;
  public reclaveUsuario:string;
  public tipoDocumentoUsuario: number;
  public codImagen:number;

  constructor(
    cod:number,
    codiRol: number,
    doc:string,
    nomUsu:string,
    apeUsu:string,
    correoUsu:string,
    rolUsu:string,
    teleUsu:string,
    estado:number,
    clave:string,
    reclave:string,
    tipoDocumento:number,
    codImagen:number,

  ){
    this.codUsuario=cod;
    this.codRol = codiRol;
    this.documentoUsuario=doc;
    this.nombresUsuario=nomUsu;
    this.apellidosUsuario=apeUsu;
    this.correoAcceso=correoUsu;
    this.telefonoUsuario=teleUsu;
    this.claveUsuario=clave;
    this.reclaveUsuario=reclave;
    this.nombreRol=rolUsu;
    this.estadoUsuario=estado;
    this.tipoDocumentoUsuario = tipoDocumento;
    this.codImagen=codImagen;
}
}
