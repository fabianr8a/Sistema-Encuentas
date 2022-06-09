import { Response, Request } from 'express';
import AccesoDAO from '../daos/AccesoDAO';
import { SQL_ACCESO } from '../repositorios/Acceso_sql';
import {SQL_REG_USU} from '../repositorios/RegistrarUsuario_sql'


class AccesoControlador extends AccesoDAO {

  public validarSesion(req: Request, res: Response): void {
    console.log(req.body);
    const parametros = [req.body.correoAcceso, req.body.claveAcceso];
    AccesoControlador.iniciarSesion(SQL_ACCESO.INICIAR_SESION_DATOS, parametros, res);
  }

  public crearUsuario(req: Request, res: Response): void {
    console.log(req.body);
    const parametros = [
      req.body.correoRegistro,
      req.body.nombresRegistro,
      req.body.apellidosRegistro,
      req.body.documentoRegistro,
      req.body.claveRegistro,

    ];
    AccesoControlador.crearElUsuario(SQL_REG_USU.EXISTE_CORREO,
      SQL_REG_USU.AGREGAR_USUARIO,
      SQL_REG_USU.AGREGAR_ACCESO,
      SQL_REG_USU.AGREGAR_INGRESO,
      SQL_REG_USU.TODO_LISTO,
      parametros, res);
  }

}
const accesoControlador = new AccesoControlador();
export default accesoControlador;
