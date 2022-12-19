"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EncuestaControlador_1 = __importDefault(require("../controladores/EncuestaControlador"));
const ResultadosEncuestasControlador_1 = __importDefault(require("../controladores/ResultadosEncuestasControlador"));
class ResultadosEncuestaRutas {
    constructor() {
        this.miRutaResultados = (0, express_1.Router)();
        this.listadoRutas();
    }
    listadoRutas() {
        //listar encuestas
        this.miRutaResultados.get('/getAll/:codEncuesta', EncuestaControlador_1.default.seleccionarEncuestaModificar);
        //Obtener respuestas
        this.miRutaResultados.get('/respuestas/:codPregunta', ResultadosEncuestasControlador_1.default.listarRespuestas);
        //Obtener respuestas unicas
        this.miRutaResultados.get('/respuestasUnicas/:codPregunta', ResultadosEncuestasControlador_1.default.listarRespuestasUnicas);
    }
}
const resultadosRutas = new ResultadosEncuestaRutas();
exports.default = resultadosRutas.miRutaResultados;
