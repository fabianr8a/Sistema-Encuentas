import { Request, Response } from 'express';
import UsuarioDAO from '../daos/UsuarioDAO';
import { SQL_USUARIO } from '../repositorios/Usuario_sql';
import { SQL_REG_USU } from '../repositorios/RegistrarUsuario_sql';


class UsuarioControlador extends UsuarioDAO {

  public obtenerTodosUsuario(req: Request, res: Response){
    UsuarioControlador.obtenerTodosUsu(SQL_USUARIO.TODOS, req, res);
  }

  public crearUsuario(req: Request, res: Response) {
    const misParametros = [
      req.body.codRol,
      req.body.documentoUsuario,
      req.body.tipoDocumentoUsuario,
      req.body.nombresUsuario,
      req.body.apellidosUsuario,
      req.body.telefonoUsuario,
      req.body.correoAcceso,
      req.body.claveUsuario,
    ];
    UsuarioControlador.crearUsuario(
      SQL_REG_USU.EXISTE_CORREO,
      SQL_USUARIO.CREAR,
      SQL_REG_USU.AGREGAR_ACCESO,
      SQL_REG_USU.TODO_LISTO,
      misParametros, res);
  }

  public actualizarUsuario(req: Request, res: Response) {
    const misParametros = [
      req.body.codRol,
      req.body.documentoUsuario,
      req.body.tipoDocumentoUsuario,
      req.body.nombresUsuario,
      req.body.apellidosUsuario,
      req.body.telefonoUsuario,
      req.body.estadoUsuario,
      req.body.codUsuario
    ];
    UsuarioControlador.actualizarUsuario(SQL_USUARIO.MODIFICAR,
      misParametros, res);
  }

  public buscarUnUsuario(req: Request, res: Response) {
    const codUsu = req.params.codUsuario;
    const losParametros = [codUsu];
    UsuarioControlador.buscarUnUsuario(
      SQL_USUARIO.BUSCAR_USUARIO,
      losParametros, res);
  }

}
const usuarioControlador = new UsuarioControlador();
export default usuarioControlador;
