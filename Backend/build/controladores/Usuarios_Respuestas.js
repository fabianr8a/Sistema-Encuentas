"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuarios_Respuestas_1 = __importDefault(require("../daos/Usuarios_Respuestas"));
const Usuarios_Respuestas_sql_1 = require("../repositorios/Usuarios_Respuestas_sql");
class EstudianteControlador extends Usuarios_Respuestas_1.default {
    listarEncuestas(req, res) {
        const codigoUsuario = req.params.codUsuario;
        const miParametro = [codigoUsuario];
        EstudianteControlador.listarLasEncuestas(Usuarios_Respuestas_sql_1.SQL_ENCUESTA_ESTUDIANTES.LISTAR_ENCUESTAS, miParametro, res);
    }
    ResponderEncuestas(req, res) {
        const arregloRespuestas = req.body[0];
        EstudianteControlador.ResponderEncuesta(Usuarios_Respuestas_sql_1.SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_FECHA, Usuarios_Respuestas_sql_1.SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_ABIERTA, Usuarios_Respuestas_sql_1.SQL_ENCUESTA_ESTUDIANTES.RESPONDER_PREGUNTA_OPCION, arregloRespuestas, res);
    }
}
const estudianteControlador = new EstudianteControlador();
exports.default = estudianteControlador;
