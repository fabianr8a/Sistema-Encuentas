import { Request, Response } from 'express';
import EstudianteDAO from '../daos/EstudianteDAO';
import { SQL_ENCUESTA_ESTUDIANTES } from '../repositorios/Estudiantes_sql';

class EstudianteControlador extends EstudianteDAO {

  public listarEncuestas(req: Request, res: Response) {
    const codigoUsuario = req.params.codUsuario;
    const miParametro = [codigoUsuario];
    EstudianteControlador.listarLasEncuestas(SQL_ENCUESTA_ESTUDIANTES.LISTAR_ENCUESTAS, miParametro, res);
  }

  public ResponderEncuestas(req: Request, res: Response) {
    const arregloRespuestas = req.body[0];
    EstudianteControlador.ResponderEncuesta(SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_FECHA,
      SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_ABIERTA,
      SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_OPCION,
      arregloRespuestas, res);
  }
}

const estudianteControlador = new EstudianteControlador();
export default estudianteControlador;
