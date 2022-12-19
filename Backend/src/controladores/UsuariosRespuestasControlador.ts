import { SQL_ENCUESTA } from './../repositorios/Encuestas_sql';
import { Request, Response } from 'express';
import UsuariosRespuestasDAO from '../daos/Usuarios_RespuestasDAO';
import { SQL_USUARIOS_RESPUESTAS } from '../repositorios/Usuarios_Respuestas_sql';

class UsuariosRespuestasControlador extends UsuariosRespuestasDAO {

  public listarEncuestas(req: Request, res: Response) {
    const codigoUsuario = req.params.codUsuario;
    const miParametro = [codigoUsuario];
    UsuariosRespuestasControlador.listarLasEncuestas(SQL_USUARIOS_RESPUESTAS.LISTAR_ENCUESTAS, miParametro, res);
  }

  public ResponderEncuestas(req: Request, res: Response) {
    const arregloRespuestas = req.body[0];
    const codigoEncuesta=req.body[1];
    UsuariosRespuestasControlador.ResponderEncuesta(SQL_USUARIOS_RESPUESTAS.RESPONDER_PREGUNTA_FECHA,
      SQL_USUARIOS_RESPUESTAS.RESPONDER_PREGUNTA_ABIERTA,
      SQL_USUARIOS_RESPUESTAS.RESPONDER_PREGUNTA_OPCION,
      SQL_ENCUESTA.MODIFICAR_ESTADO_ENCUESTA,
      codigoEncuesta,
      arregloRespuestas, res);
  }

  public validarOpcionResponder(req: Request, res: Response) {
    const codigoEncuesta = req.params.codEncuesta;
    const losParametros = [codigoEncuesta];
    UsuariosRespuestasControlador.validarOpcion(
      SQL_USUARIOS_RESPUESTAS.VALIDAR_OPCION_RESPONDER,
      losParametros, res);
  }
}

const usuariosRespuestasControlador = new UsuariosRespuestasControlador();
export default usuariosRespuestasControlador;
