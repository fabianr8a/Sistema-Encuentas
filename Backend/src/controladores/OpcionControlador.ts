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
}

const opcionControlador = new OpcionControlador();
export default opcionControlador;
