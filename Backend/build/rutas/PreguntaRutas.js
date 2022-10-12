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
        //listar preguntas
        this.miRutaPregunta.get('/preguntas/:codEncuesta', PreguntaControlador_1.default.listarPregunta);
        //seleccionar pregunta
        this.miRutaPregunta.get('/seleccionar/:codPregunta', PreguntaControlador_1.default.seleccionarPregunta);
        //modificar
        this.miRutaPregunta.put('/modificar/:codPregunta', PreguntaControlador_1.default.modificarPregunta);
        //eliminar pregunta
        this.miRutaPregunta.delete('/eliminar/:codPregunta', PreguntaControlador_1.default.eliminarPregunta);
        //agregar pregunta
        this.miRutaPregunta.post('/crear', PreguntaControlador_1.default.crearPreguntas);
    }
}
const preguntaRutas = new PreguntaRutas();
exports.default = preguntaRutas.miRutaPregunta;
