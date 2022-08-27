import { Request, Response } from 'express';
import RolDAO from '../daos/EncuestaDAO';
import { SQL_ENCUESTA } from '../repositorios/Encuestas_sql';

class EncuestaControlador extends RolDAO {

  public listarEncuestas(req: Request, res: Response) {
    EncuestaControlador.listarLasEncuestas(SQL_ENCUESTA.LISTAR, req, res);
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
    const buscarDependencia = req.params.codDependencia;
    const miParametro = [buscarDependencia];
    if (!buscarDependencia) { return res.status(400).json({ 'Error': 'No se encontro un parametro' }) }
    EncuestaControlador.listarLosTiposDependencia(SQL_ENCUESTA.LISTAR_TIPO_DEPENDENCIAS, miParametro, res);
  }

  public crearEncuesta(req: Request, res: Response) {
    const misParametros = [
      req.body[0].codDependencia,
      req.body[0].codTipoEvento,
      req.body[0].nombreEncuesta,
      req.body[0].descripcionEncuesta,
      req.body[0].fechaCreacionEncuesta,
      req.body[0].fechaCierreEncuesta,
      req.body[1].descripcionPregunta,
      req.body[1].codTipoPregunta,
    ];
    EncuestaControlador.crearEncuesta(SQL_ENCUESTA.CREAR_ENCUESTA, SQL_ENCUESTA.CREAR_PREGUNTAS, misParametros, res);
  }

  public crearPreguntas(req: Request, res: Response) {
    const losParametros = [
      req.body.codTipoPregunta,
      req.body.descripcionPregunta,
    ];
    EncuestaControlador.crearLasPreguntas(SQL_ENCUESTA.CREAR_PREGUNTAS, losParametros, res);
  }

  public seleccionarEncuestaModificar(req: Request, res: Response) {
    const seleccionarEncuesta = req.params.codEncuesta;
    const miParametro = [seleccionarEncuesta];
    if(!seleccionarEncuesta){return res.status(400).json({'Error':'No se encontro un parametro'})}
    EncuestaControlador.seleccionEncuestaModificar(SQL_ENCUESTA.SELECCIONAR_ENCUESTA_MODIFICAR, miParametro, res);
  }

  public modificarEncuesta(req: Request, res: Response) {
    const codigoEncuesta = req.params.codEncuesta;
    const codigoDependencia = req.body.codDependencia;
    const codigoEvento = req.body.codTipoEvento;
    const nombreEncuesta = req.body.nombreEncuesta;
    const descripcionEncuesta = req.body.descripcionEncuesta;
    const fechaCreacion = req.body.fechaCreacionEncuesta;
    const fechaCierre = req.body.fechaCierreEncuesta;
    const misParametros = [codigoEncuesta, codigoDependencia, codigoEvento, nombreEncuesta, descripcionEncuesta, fechaCreacion, fechaCierre];
    EncuestaControlador.modificarLaEncuesta(SQL_ENCUESTA.MODIFICAR_ENCUESTA, misParametros, res);
  }

}
const encuestaControlador = new EncuestaControlador();
export default encuestaControlador;
