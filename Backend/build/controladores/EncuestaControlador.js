"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EncuestaDAO_1 = __importDefault(require("../daos/EncuestaDAO"));
const Encuestas_sql_1 = require("../repositorios/Encuestas_sql");
class EncuestaControlador extends EncuestaDAO_1.default {
    listarEncuestas(req, res) {
        EncuestaControlador.listarLasEncuestas(Encuestas_sql_1.SQL_ENCUESTA.LISTAR, req, res);
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
            req.body[0].descripcionEncuesta,
            req.body[0].fechaCreacionEncuesta,
            req.body[0].fechaCierreEncuesta,
            req.body[1].descripcionPregunta,
            req.body[1].codTipoPregunta,
        ];
        EncuestaControlador.crearEncuesta(Encuestas_sql_1.SQL_ENCUESTA.CREAR_ENCUESTA, Encuestas_sql_1.SQL_ENCUESTA.CREAR_PREGUNTAS, misParametros, res);
    }
    crearPreguntas(req, res) {
        const losParametros = [
            req.body.codTipoPregunta,
            req.body.descripcionPregunta,
        ];
        EncuestaControlador.crearLasPreguntas(Encuestas_sql_1.SQL_ENCUESTA.CREAR_PREGUNTAS, losParametros, res);
    }
}
const encuestaControlador = new EncuestaControlador();
exports.default = encuestaControlador;
