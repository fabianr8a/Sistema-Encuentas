"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PreguntaDAO_1 = __importDefault(require("../daos/PreguntaDAO"));
const Preguntas_sql_1 = require("../repositorios/Preguntas_sql");
class PreguntaControlador extends PreguntaDAO_1.default {
    crearPreguntas(req, res) {
        const losParametros = [
            req.body.codTipoPregunta,
            req.body.descripcionPregunta,
        ];
        PreguntaControlador.crearLasPreguntas(Preguntas_sql_1.SQL_PREGUNTAS.CREAR_PREGUNTAS, losParametros, res);
    }
    seleccionarPregunta(req, res) {
        const seleccionarPregunta = req.params.codEncuesta;
        const miParametro = [seleccionarPregunta];
        if (!seleccionarPregunta) {
            return res.status(400).json({ 'Error': 'No se encontro un parametro' });
        }
        PreguntaControlador.seleccionarPregunta(Preguntas_sql_1.SQL_PREGUNTAS.SELECCIONAR_PREGUNTAS, miParametro, res);
    }
    modificarPregunta(req, res) {
        const codigoEncuesta = req.params.codPregunta;
        const descripcionPregunta = req.body.descripcionPregunta;
        const misParametros = [codigoEncuesta, descripcionPregunta];
        PreguntaControlador.modificarPregunta(Preguntas_sql_1.SQL_PREGUNTAS.MODIFICAR_PREGUNTA, misParametros, res);
    }
}
const preguntaControlador = new PreguntaControlador();
exports.default = preguntaControlador;
