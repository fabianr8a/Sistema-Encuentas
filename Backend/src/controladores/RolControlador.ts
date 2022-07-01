import { Request, Response } from 'express';
import RolDAO from '../daos/RolDAO';
import { SQL_ROL } from '../repositorios/Roles_sql';

class RolControlador extends RolDAO {

  public obtenerTodosRoles(req: Request, res: Response) {
    RolControlador.obtenerTodos(SQL_ROL.TODOS, req, res);
  }

  public buscarRoles(req: Request, res: Response) {
    const buscar = req.body.nombreRol;
    const miParametro = [buscar];
    console.log(req.body, 'este es el buscar');
    if (buscar === '') {
      RolControlador.obtenerTodos(SQL_ROL.TODOS, req, res);
    } else {
      RolControlador.buscarRol(SQL_ROL.BUSCAR, miParametro, res);
    }
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
    console.log(req.body, 'este es el buscar');
    if(!buscarRol){return res.status(400).json({'Error':'No se encontro un parametro'})}
    RolControlador.buscarUnRol(SQL_ROL.BUSCARROL, miParametro, res);
  }




}
const rolControlador = new RolControlador();
export default rolControlador;
