import { Request, Response } from 'express';
import EncuestaDAO from '../daos/EncuestaDAO';
import { SQL_ENCUESTA } from '../repositorios/Encuestas_sql';
import { SQL_PREGUNTAS } from '../repositorios/Preguntas_sql'
import { SQL_USUARIO_ENCUESTAS } from '../repositorios/Usuario_Encuestas_sql'
import { SQL_OPCIONES } from '../repositorios/Opciones_sql'

class EncuestaControlador extends EncuestaDAO {

  public listarEncuestas(req: Request, res: Response) {
    const codigoUsuario = req.params.codUsuario;
    const miParametro = [codigoUsuario];
    EncuestaControlador.listarLasEncuestas(SQL_ENCUESTA.LISTAR, miParametro, res);
  }

  public listarEventos(req: Request, res: Response) {
    EncuestaControlador.listarLosEventos(SQL_ENCUESTA.LISTAR_EVENTOS, req, res);
  }

  public listarTipoPreguntas(req: Request, res: Response) {
    EncuestaControlador.listarLasTipoPreguntas(SQL_ENCUESTA.LISTAR_TIPO_PREGUNTAS, req, res);
  }

  public listarDependencias(req: Request, res: Response) {
    EncuestaControlador.listarLasDependencias(SQL_ENCUESTA.LISTAR_DEPENDENCIAS, req, res);
  }

  public listarTiposDependencia(req: Request, res: Response) {
    EncuestaControlador.listarLosTiposDependencia(SQL_ENCUESTA.LISTAR_TIPO_DEPENDENCIAS, req, res);
  }

  public crearEncuesta(req: Request, res: Response) {
    const misParametros = [
      req.body[0].codTipoDependencia,
      req.body[0].codTipoEvento,
      req.body[0].nombreEncuesta,
      req.body[0].fechaCreacionEncuesta,
      req.body[0].fechaCierreEncuesta,
      req.body[0].descripcionEncuesta,
      req.body[0].codUsuario,
    ];
    const arregloPreguntas = req.body[1];
    EncuestaControlador.crearEncuesta(SQL_ENCUESTA.CREAR_ENCUESTA, SQL_PREGUNTAS.CREAR_PREGUNTAS, SQL_OPCIONES.CREAR_OPCIONES, SQL_USUARIO_ENCUESTAS.CREAR_USUARIO_ENCUESTAS, misParametros, arregloPreguntas, res);
  }


  public seleccionarEncuestaModificar(req: Request, res: Response) {
    const seleccionarEncuesta = req.params.codEncuesta;
    const miParametro = [seleccionarEncuesta];
    if (!seleccionarEncuesta) { return res.status(400).json({ 'Error': 'No se encontro un parametro' }) }
    EncuestaControlador.seleccionEncuestaModificar(SQL_ENCUESTA.SELECCIONAR_ENCUESTA_MODIFICAR, miParametro, res);
  }

  public modificarEncuesta(req: Request, res: Response) {
    const codigoEncuesta = req.params.codEncuesta;
    const codigoTipoDependencia = req.body.codTipoDependencia;
    const codigoEvento = req.body.codTipoEvento;
    const nombreEncuesta = req.body.nombreEncuesta;
    const descripcionEncuesta = req.body.descripcionEncuesta;
    const fechaCreacion = req.body.fechaCreacionEncuesta;
    const fechaCierre = req.body.fechaCierreEncuesta;
    const misParametros = [codigoEncuesta, codigoTipoDependencia, codigoEvento, nombreEncuesta, descripcionEncuesta, fechaCreacion, fechaCierre];
    EncuestaControlador.modificarLaEncuesta(SQL_ENCUESTA.MODIFICAR_ENCUESTA, misParametros, res);
  }

  public eliminarEncuesta(req: Request, res: Response) {
    const codigo = req.params.codEncuesta;
    EncuestaControlador.eliminarEncuesta(
      SQL_PREGUNTAS.ELIMINAR_TODAS_PREGUNTAS,
      SQL_OPCIONES.ELIMINAR_TODAS_OPCIONES,
      SQL_ENCUESTA.ELIMINAR_ENCUESTA,
      SQL_USUARIO_ENCUESTAS.ELIMINAR_USUARIO_ENCUESTA,
      SQL_PREGUNTAS.SELECCIONAR_TODAS_PREGUNTAS,
      codigo, res);
  }

}
const encuestaControlador = new EncuestaControlador();
export default encuestaControlador;
