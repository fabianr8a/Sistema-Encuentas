import { Request, Response } from 'express';
import EstudianteDAO from '../daos/Usuarios_RespuestasDAO';
import { SQL_ENCUESTA_ESTUDIANTES } from '../repositorios/Usuarios_Respuestas_sql';

class EstudianteControlador extends EstudianteDAO {

  public listarEncuestas(req: Request, res: Response) {
    const codigoUsuario = req.params.codUsuario;
    const miParametro = [codigoUsuario];
    EstudianteControlador.listarLasEncuestas(SQL_ENCUESTA_ESTUDIANTES.LISTAR_ENCUESTAS, miParametro, res);
  }

  public ResponderEncuestas(req: Request, res: Response) {
    const arregloRespuestas = req.body[0];
    const codigoEncuesta=req.body[1];
    EstudianteControlador.ResponderEncuesta(SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_FECHA,
      SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_ABIERTA,
      SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_OPCION,
      SQL_ENCUESTA_ESTUDIANTES.MODIFICAR_ESTADO_ENCUESTA,
      codigoEncuesta,
      arregloRespuestas, res);
  }

  public validarOpcionResponder(req: Request, res: Response) {
    const codigoEncuesta = req.params.codEncuesta;
    const losParametros = [codigoEncuesta];
    EstudianteControlador.validarOpcion(
      SQL_ENCUESTA_ESTUDIANTES.VALIDAR_OPCION_RESPONDER,
      losParametros, res);
  }
}

const estudianteControlador = new EstudianteControlador();
export default estudianteControlador;
