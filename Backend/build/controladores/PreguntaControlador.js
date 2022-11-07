"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PreguntaDAO_1 = __importDefault(require("../daos/PreguntaDAO"));
const Preguntas_sql_1 = require("../repositorios/Preguntas_sql");
const Opciones_sql_1 = require("../repositorios/Opciones_sql");
class PreguntaControlador extends PreguntaDAO_1.default {
    crearPreguntas(req, res) {
        const parametrosPregunta = req.body[0];
        PreguntaControlador.crearPregunta(Preguntas_sql_1.SQL_PREGUNTAS.CREAR_PREGUNTAS, Opciones_sql_1.SQL_OPCIONES.CREAR_OPCIONES, parametrosPregunta, res);
    }
    listarPregunta(req, res) {
        const seleccionarPregunta = req.params.codEncuesta;
        const miParametro = [seleccionarPregunta];
        if (!seleccionarPregunta) {
            return res.status(400).json({ 'Error': 'No se encontro un parametro' });
        }
        PreguntaControlador.listarPregunta(Preguntas_sql_1.SQL_PREGUNTAS.LISTAR_PREGUNTAS, miParametro, res);
    }
    seleccionarPregunta(req, res) {
        const buscarPregunta = req.params.codPregunta;
        const miParametro = [buscarPregunta];
        if (!buscarPregunta) {
            return res.status(400).json({ 'Error': 'No se encontro un parametro' });
        }
        PreguntaControlador.seleccionarPregunta(Preguntas_sql_1.SQL_PREGUNTAS.SELECCIONAR_PREGUNTA, miParametro, res);
    }
    modificarPregunta(req, res) {
        const codigoPregunta = req.params.codPregunta;
        const descripcionPregunta = req.body.descripcionPregunta;
        const misParametros = [codigoPregunta, descripcionPregunta];
        PreguntaControlador.modificarPregunta(Preguntas_sql_1.SQL_PREGUNTAS.MODIFICAR_PREGUNTA, misParametros, res);
    }
    eliminarPregunta(req, res) {
        const codigo = req.params.codPregunta;
        const losParametros = [codigo];
        PreguntaControlador.eliminarPregunta(Preguntas_sql_1.SQL_PREGUNTAS.ELIMINAR_PREGUNTA, losParametros, res);
    }
}
const preguntaControlador = new PreguntaControlador();
exports.default = preguntaControlador;
