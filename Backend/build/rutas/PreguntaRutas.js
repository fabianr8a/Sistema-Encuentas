"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PreguntaControlador_1 = __importDefault(require("../controladores/PreguntaControlador"));
class PreguntaRutas {
    constructor() {
        this.miRutaPregunta = (0, express_1.Router)();
        this.listadoRutas();
    }
    listadoRutas() {
        //seleccionar pregunta para modificar
        this.miRutaPregunta.get('/preguntas/:codEncuesta', PreguntaControlador_1.default.seleccionarPregunta);
        //modificar
        this.miRutaPregunta.put('/modificar/:codPregunta', PreguntaControlador_1.default.modificarPregunta);
    }
}
const preguntaRutas = new PreguntaRutas();
exports.default = preguntaRutas.miRutaPregunta;
