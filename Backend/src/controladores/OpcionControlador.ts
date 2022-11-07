import { Request, Response } from 'express';
import OpcionDAO from '../daos/OpcionDAO';
import {SQL_OPCIONES} from '../repositorios/Opciones_sql'

class OpcionControlador extends OpcionDAO {
  public crearOpciones(req: Request, res: Response) {
    const losParametros = [
      req.body.textoOpcion,
      req.body.codPregunta,
    ];
    OpcionControlador.crearLasOpciones(SQL_OPCIONES.CREAR_OPCIONES, losParametros, res);
  }


  public eliminarOpcion(req: Request, res: Response) {
    const codigo = req.params.codOpcion;
    const losParametros = [codigo];
    OpcionControlador.eliminarOpcion(SQL_OPCIONES.ELIMINAR_OPCIONES, losParametros, res);
  }

  public seleccionarOpcion(req: Request, res: Response) {
    const buscarOpcion = req.params.codOpcion;
    const miParametro = [buscarOpcion];
    if(!buscarOpcion){return res.status(400).json({'Error':'No se encontro un parametro'})}
    OpcionControlador.seleccionarOpcion(SQL_OPCIONES.SELECCIONAR_OPCION, miParametro, res);
  }

  public modificarOpcion(req: Request, res: Response) {
    const codigoOpcion = req.params.codOpcion;
    const textoOpcion = req.body.textoOpcion;
    const misParametros = [codigoOpcion, textoOpcion];
      OpcionControlador.modificarOpcion(SQL_OPCIONES.MODIFICAR_OPCIONES, misParametros, res);
  }
}

const opcionControlador = new OpcionControlador();
export default opcionControlador;
