"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EncuestaDAO_1 = __importDefault(require("../daos/EncuestaDAO"));
const Encuestas_sql_1 = require("../repositorios/Encuestas_sql");
const Preguntas_sql_1 = require("../repositorios/Preguntas_sql");
const Usuario_Encuestas_sql_1 = require("../repositorios/Usuario_Encuestas_sql");
const Opciones_sql_1 = require("../repositorios/Opciones_sql");
class EncuestaControlador extends EncuestaDAO_1.default {
    listarEncuestas(req, res) {
        const codigoUsuario = req.params.codUsuario;
        const miParametro = [codigoUsuario];
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
        EncuestaControlador.listarLosTiposDependencia(Encuestas_sql_1.SQL_ENCUESTA.LISTAR_TIPO_DEPENDENCIAS, req, res);
    }
    crearEncuesta(req, res) {
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
        EncuestaControlador.crearEncuesta(Encuestas_sql_1.SQL_ENCUESTA.CREAR_ENCUESTA, Preguntas_sql_1.SQL_PREGUNTAS.CREAR_PREGUNTAS, Opciones_sql_1.SQL_OPCIONES.CREAR_OPCIONES, Usuario_Encuestas_sql_1.SQL_USUARIO_ENCUESTAS.CREAR_USUARIO_ENCUESTAS, misParametros, arregloPreguntas, res);
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
        const codigoTipoDependencia = req.body.codTipoDependencia;
        const codigoEvento = req.body.codTipoEvento;
        const nombreEncuesta = req.body.nombreEncuesta;
        const descripcionEncuesta = req.body.descripcionEncuesta;
        const fechaCreacion = req.body.fechaCreacionEncuesta;
        const fechaCierre = req.body.fechaCierreEncuesta;
        const misParametros = [codigoEncuesta, codigoTipoDependencia, codigoEvento, nombreEncuesta, descripcionEncuesta, fechaCreacion, fechaCierre];
        EncuestaControlador.modificarLaEncuesta(Encuestas_sql_1.SQL_ENCUESTA.MODIFICAR_ENCUESTA, misParametros, res);
    }
    eliminarEncuesta(req, res) {
        const codigo = req.params.codEncuesta;
        EncuestaControlador.eliminarEncuesta(Preguntas_sql_1.SQL_PREGUNTAS.ELIMINAR_TODAS_PREGUNTAS, Opciones_sql_1.SQL_OPCIONES.ELIMINAR_TODAS_OPCIONES, Encuestas_sql_1.SQL_ENCUESTA.ELIMINAR_ENCUESTA, Usuario_Encuestas_sql_1.SQL_USUARIO_ENCUESTAS.ELIMINAR_USUARIO_ENCUESTA, Preguntas_sql_1.SQL_PREGUNTAS.SELECCIONAR_TODAS_PREGUNTAS, codigo, res);
    }
}
const encuestaControlador = new EncuestaControlador();
exports.default = encuestaControlador;
