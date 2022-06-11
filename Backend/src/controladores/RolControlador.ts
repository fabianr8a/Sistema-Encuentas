import { Request, Response } from 'express';
import RolDAO from '../daos/RolDAO';
import { SQL_ROL } from '../repositorios/Roles_sql';

class RolControlador extends RolDAO {

  public obtenerTodosRoles(req: Request, res: Response){
    RolControlador.obtenerTodos(SQL_ROL.TODOS, req, res);
  }

  public buscarRoles(req: Request, res: Response){
    const buscar = req.body.nombreRol;
    const miParametro = [buscar];
    console.log(req.body, 'este es el buscar');
    if(buscar===''){
      RolControlador.obtenerTodos(SQL_ROL.TODOS, req, res);
    }else{
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



}
const rolControlador = new RolControlador();
export default rolControlador;
