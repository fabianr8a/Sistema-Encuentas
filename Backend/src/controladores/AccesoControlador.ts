import { Response, Request } from 'express';
import AccesoDAO from '../daos/AccesoDAO';
import { SQL_ACCESO } from '../repositorios/Acceso_sql';
import { SQL_REG_USU } from '../repositorios/Registrar_Usuario_sql'


class AccesoControlador extends AccesoDAO {

  public validarSesion(req: Request, res: Response): void {
    const parametros = [req.body.correoAcceso, req.body.claveAcceso];
    AccesoControlador.iniciarSesion(SQL_ACCESO.INICIAR_SESION_DATOS, parametros, res);
  }

  public crearUsuario(req: Request, res: Response): void {
    const parametros = [
      req.body[0].correoRegistro,
      req.body[0].nombresRegistro,
      req.body[0].apellidosRegistro,
      req.body[0].documentoRegistro,
      req.body[0].telefonoRegistro,
      req.body[0].codTipoDependencia,
      req.body[0].claveRegistro,

    ];
    AccesoControlador.crearElUsuario(SQL_REG_USU.EXISTE_CORREO,
      SQL_REG_USU.AGREGAR_USUARIO,
      SQL_REG_USU.AGREGAR_ACCESO,
      SQL_REG_USU.TODO_LISTO,
      parametros, res);
  }

  public buscarUnAcceso(req: Request, res: Response) {
    const codUsu = req.params.codUsuario;
    const losParametros = [codUsu];
    AccesoControlador.obtenerUnAcceso(
      SQL_ACCESO.BUSCAR, losParametros, res);
  }

  public actualizarAcceso(req: Request, res: Response) {
    const codUsu = req.params.codUsuario;
    const misParametros = [
      codUsu,
      req.body.correoAcceso,
      req.body.claveAcceso,
    ];
      AccesoControlador.actualizarAcceso(SQL_ACCESO.MODIFICAR,
      misParametros, res);
  }

}
const accesoControlador = new AccesoControlador();
export default accesoControlador;
