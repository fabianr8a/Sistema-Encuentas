import { Request, Response } from 'express';
import RolDAO from '../daos/RolDAO';
import { SQL_ROL } from '../repositorios/Roles_sql';

class RolControlador extends RolDAO {

  public obtenerTodosRoles(req: Request, res: Response) {
    RolControlador.obtenerTodos(SQL_ROL.TODOS, req, res);
  }

  public eliminarRol(req: Request, res: Response) {
    console.log(req);
    const codiguito = req.params.codigo;
    const losParametros = [codiguito];
    RolControlador.eliminarRol(SQL_ROL.ELIMINAR, losParametros, res);
  }

  public crearRol(req: Request, res: Response) {
    const misParametros = [req.body.nombreRol];
    RolControlador.crearRol(SQL_ROL.CREAR, misParametros, res);
  }

  public modificarRol(req: Request, res: Response) {
    const codigoRol = req.params.codRol;
    const nombreRol = req.body.nombreRol;
    const estadoRol = req.body.estadoRol
    const misParametros = [codigoRol, nombreRol, estadoRol];
      RolControlador.modificarRol(SQL_ROL.MODIFICAR, misParametros, res);
  }

  public buscarUnosRoles(req: Request, res: Response) {
    const buscarRol = req.params.codRol;
    const miParametro = [buscarRol];
    if(!buscarRol){return res.status(400).json({'Error':'No se encontro un parametro'})}
    RolControlador.buscarUnRolModificar(SQL_ROL.BUSCAR_ROL_MODIFICAR, miParametro, res);
  }

  public buscarNombreRoles(req: Request, res: Response) {
   RolControlador.obtenerNombresRol(SQL_ROL.BUSCAR_ROL, req, res);
 }
}
const rolControlador = new RolControlador();
export default rolControlador;
