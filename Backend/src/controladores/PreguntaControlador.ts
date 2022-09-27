import { Request, Response } from 'express';
import PreguntaDAO from '../daos/PreguntaDAO';
import {SQL_PREGUNTAS} from '../repositorios/Preguntas_sql'

class PreguntaControlador extends PreguntaDAO {
  public crearPreguntas(req: Request, res: Response) {
    const losParametros = [
      req.body.codTipoPregunta,
      req.body.descripcionPregunta,
    ];
    PreguntaControlador.crearLasPreguntas(SQL_PREGUNTAS.CREAR_PREGUNTAS, losParametros, res);
  }

  public seleccionarPregunta(req: Request, res: Response) {
    const seleccionarPregunta = req.params.codEncuesta;
    const miParametro = [seleccionarPregunta];
    if(!seleccionarPregunta){return res.status(400).json({'Error':'No se encontro un parametro'})}
    PreguntaControlador.seleccionarPregunta(SQL_PREGUNTAS.SELECCIONAR_PREGUNTAS, miParametro, res);
  }

  public modificarPregunta(req: Request, res: Response) {
    const codigoEncuesta = req.params.codPregunta
    const descripcionPregunta = req.body.descripcionPregunta;
    const misParametros = [codigoEncuesta, descripcionPregunta];
    PreguntaControlador.modificarPregunta(SQL_PREGUNTAS.MODIFICAR_PREGUNTA, misParametros, res);
  }

}

const preguntaControlador = new PreguntaControlador();
export default preguntaControlador;
