"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resultados_Encuestas_sql_1 = require("./../repositorios/Resultados_Encuestas_sql");
const Resultados_EncuestasDAO_1 = __importDefault(require("../daos/Resultados_EncuestasDAO"));
class ResultadosEncuestasControlador extends Resultados_EncuestasDAO_1.default {
    listarRespuestas(req, res) {
        const codigoPregunta = req.params.codPregunta;
        const miParametro = [codigoPregunta];
        ResultadosEncuestasControlador.listarRespuestas(Resultados_Encuestas_sql_1.SQL_RESULTADOS_ENCUESTAS.LISTAR_RESPUESTAS, miParametro, res);
    }
    listarRespuestasUnicas(req, res) {
        const codigoPregunta = req.params.codPregunta;
        const miParametro = [codigoPregunta];
        ResultadosEncuestasControlador.listarRespuestas(Resultados_Encuestas_sql_1.SQL_RESULTADOS_ENCUESTAS.RESPUESTAS_UNICAS, miParametro, res);
    }
}
const resultadosEncuestasControlador = new ResultadosEncuestasControlador();
exports.default = resultadosEncuestasControlador;
