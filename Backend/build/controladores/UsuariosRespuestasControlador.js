"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuarios_RespuestasDAO_1 = __importDefault(require("../daos/Usuarios_RespuestasDAO"));
const Usuarios_Respuestas_sql_1 = require("../repositorios/Usuarios_Respuestas_sql");
class EstudianteControlador extends Usuarios_RespuestasDAO_1.default {
    listarEncuestas(req, res) {
        const codigoUsuario = req.params.codUsuario;
        const miParametro = [codigoUsuario];
        EstudianteControlador.listarLasEncuestas(Usuarios_Respuestas_sql_1.SQL_ENCUESTA_ESTUDIANTES.LISTAR_ENCUESTAS, miParametro, res);
    }
    ResponderEncuestas(req, res) {
        const arregloRespuestas = req.body[0];
        const codigoEncuesta = req.body[1];
        EstudianteControlador.ResponderEncuesta(Usuarios_Respuestas_sql_1.SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_FECHA, Usuarios_Respuestas_sql_1.SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_ABIERTA, Usuarios_Respuestas_sql_1.SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_OPCION, Usuarios_Respuestas_sql_1.SQL_ENCUESTA_ESTUDIANTES.MODIFICAR_ESTADO_ENCUESTA, codigoEncuesta, arregloRespuestas, res);
    }
    validarOpcionResponder(req, res) {
        const codigoEncuesta = req.params.codEncuesta;
        const losParametros = [codigoEncuesta];
        EstudianteControlador.validarOpcion(Usuarios_Respuestas_sql_1.SQL_ENCUESTA_ESTUDIANTES.VALIDAR_OPCION_RESPONDER, losParametros, res);
    }
}
const estudianteControlador = new EstudianteControlador();
exports.default = estudianteControlador;
