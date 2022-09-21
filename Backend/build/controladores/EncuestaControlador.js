"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EncuestaDAO_1 = __importDefault(require("../daos/EncuestaDAO"));
const Encuestas_sql_1 = require("../repositorios/Encuestas_sql");
class EncuestaControlador extends EncuestaDAO_1.default {
    listarEncuestas(req, res) {
        const codigoUsuario = req.params.codUsuario;
        const miParametro = [codigoUsuario];
        if (!codigoUsuario) {
            return res.status(400).json({ 'Error': 'No se encontro un parametro' });
        }
        EncuestaControlador.listarLasEncuestas(Encuestas_sql_1.SQL_ENCUESTA.LISTAR, miParametro, res);
    }
    listarEventos(req, res) {
        EncuestaControlador.listarLosEventos(Encuestas_sql_1.SQL_ENCUESTA.LISTAR_EVENTOS, req, res);
    }
    listarTipoPreguntas(req, res) {
        EncuestaControlador.listarLasTipoPreguntas(Encuestas_sql_1.SQL_ENCUESTA.LISTAR_TIPO_PREGUNTAS, req, res);
    }
    listarDependencias(req, res) {
        EncuestaControlador.listarLasDependencias(Encuestas_sql_1.SQL_ENCUESTA.LISTAR_DEPENDENCIAS, req, res);
    }
    listarTiposDependencia(req, res) {
        const buscarDependencia = req.params.codDependencia;
        const miParametro = [buscarDependencia];
        if (!buscarDependencia) {
            return res.status(400).json({ 'Error': 'No se encontro un parametro' });
        }
        EncuestaControlador.listarLosTiposDependencia(Encuestas_sql_1.SQL_ENCUESTA.LISTAR_TIPO_DEPENDENCIAS, miParametro, res);
    }
    crearEncuesta(req, res) {
        const misParametros = [
            req.body[0].codDependencia,
            req.body[0].codTipoEvento,
            req.body[0].nombreEncuesta,
            req.body[0].fechaCreacionEncuesta,
            req.body[0].fechaCierreEncuesta,
            req.body[0].descripcionEncuesta,
            req.body[0].codUsuario,
        ];
        const arregloPreguntas = req.body[1];
        EncuestaControlador.crearEncuesta(Encuestas_sql_1.SQL_ENCUESTA.CREAR_ENCUESTA, Encuestas_sql_1.SQL_ENCUESTA.CREAR_PREGUNTAS, Encuestas_sql_1.SQL_ENCUESTA.CREAR_OPCIONES, Encuestas_sql_1.SQL_ENCUESTA.CREAR_USUARIO_ENCUESTAS, misParametros, arregloPreguntas, res);
    }
    crearPreguntas(req, res) {
        const losParametros = [
            req.body.codTipoPregunta,
            req.body.descripcionPregunta,
        ];
        EncuestaControlador.crearLasPreguntas(Encuestas_sql_1.SQL_ENCUESTA.CREAR_PREGUNTAS, losParametros, res);
    }
    crearOpciones(req, res) {
        const losParametros = [
            req.body.textoOpcion,
            req.body.codPregunta,
        ];
        EncuestaControlador.crearLasPreguntas(Encuestas_sql_1.SQL_ENCUESTA.CREAR_OPCIONES, losParametros, res);
    }
    seleccionarEncuestaModificar(req, res) {
        const seleccionarEncuesta = req.params.codEncuesta;
        const miParametro = [seleccionarEncuesta];
        if (!seleccionarEncuesta) {
            return res.status(400).json({ 'Error': 'No se encontro un parametro' });
        }
        EncuestaControlador.seleccionEncuestaModificar(Encuestas_sql_1.SQL_ENCUESTA.SELECCIONAR_ENCUESTA_MODIFICAR, miParametro, res);
    }
    modificarEncuesta(req, res) {
        const codigoEncuesta = req.params.codEncuesta;
        const codigoDependencia = req.body.codDependencia;
        const codigoEvento = req.body.codTipoEvento;
        const nombreEncuesta = req.body.nombreEncuesta;
        const descripcionEncuesta = req.body.descripcionEncuesta;
        const fechaCreacion = req.body.fechaCreacionEncuesta;
        const fechaCierre = req.body.fechaCierreEncuesta;
        const misParametros = [codigoEncuesta, codigoDependencia, codigoEvento, nombreEncuesta, descripcionEncuesta, fechaCreacion, fechaCierre];
        EncuestaControlador.modificarLaEncuesta(Encuestas_sql_1.SQL_ENCUESTA.MODIFICAR_ENCUESTA, misParametros, res);
    }
}
const encuestaControlador = new EncuestaControlador();
exports.default = encuestaControlador;
