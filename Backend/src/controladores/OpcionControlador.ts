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

  public listarOpcion(req: Request, res: Response) {
    const seleccionarOpcion = req.params.codPregunta;
    const miParametro = [seleccionarOpcion];
    if(!seleccionarOpcion){return res.status(400).json({'Error':'No se encontro un parametro'})}
    OpcionControlador.listarOpcion(SQL_OPCIONES.SELECCIONAR_OPCIONES, miParametro, res);
  }

  public eliminarOpcion(req: Request, res: Response) {
    const codigo = req.params.codOpcion;
    const losParametros = [codigo];
    OpcionControlador.eliminarOpcion(SQL_OPCIONES.ELIMINAR_OPCIONES, losParametros, res);
  }
}

const opcionControlador = new OpcionControlador();
export default opcionControlador;
