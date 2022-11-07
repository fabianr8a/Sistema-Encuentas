import { Request, Response } from 'express';
import PreguntaDAO from '../daos/PreguntaDAO';
import {SQL_PREGUNTAS} from '../repositorios/Preguntas_sql';
import {SQL_OPCIONES} from '../repositorios/Opciones_sql';



class PreguntaControlador extends PreguntaDAO {

  public crearPreguntas(req: Request, res: Response) {
   const parametrosPregunta =
     req.body[0];
    PreguntaControlador.crearPregunta(SQL_PREGUNTAS.CREAR_PREGUNTAS, SQL_OPCIONES.CREAR_OPCIONES, parametrosPregunta, res);
  }

  public listarPregunta(req: Request, res: Response) {
    const seleccionarPregunta = req.params.codEncuesta;
    const miParametro = [seleccionarPregunta];
    if(!seleccionarPregunta){return res.status(400).json({'Error':'No se encontro un parametro'})}
    PreguntaControlador.listarPregunta(SQL_PREGUNTAS.LISTAR_PREGUNTAS, miParametro, res);
  }

  public seleccionarPregunta(req: Request, res: Response) {
    const buscarPregunta = req.params.codPregunta;
    const miParametro = [buscarPregunta];
    if(!buscarPregunta){return res.status(400).json({'Error':'No se encontro un parametro'})}
    PreguntaControlador.seleccionarPregunta(SQL_PREGUNTAS.SELECCIONAR_PREGUNTA, miParametro, res);
  }

  public modificarPregunta(req: Request, res: Response) {
    const codigoPregunta = req.params.codPregunta
    const descripcionPregunta = req.body.descripcionPregunta;
    const misParametros = [codigoPregunta, descripcionPregunta];
    PreguntaControlador.modificarPregunta(SQL_PREGUNTAS.MODIFICAR_PREGUNTA, misParametros, res);
  }

  public eliminarPregunta(req: Request, res: Response) {
    const codigo = req.params.codPregunta;
    const losParametros = [codigo];
    PreguntaControlador.eliminarPregunta(SQL_PREGUNTAS.ELIMINAR_PREGUNTA, losParametros, res);
  }

}

const preguntaControlador = new PreguntaControlador();
export default preguntaControlador;
