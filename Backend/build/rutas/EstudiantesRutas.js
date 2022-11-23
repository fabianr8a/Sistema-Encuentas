"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuariosRespuestasControlador_1 = __importDefault(require("../controladores/UsuariosRespuestasControlador"));
class EstudianteRutas {
    constructor() {
        this.miRutaEstudiante = (0, express_1.Router)();
        this.listadoRutas();
    }
    listadoRutas() {
        //listar encuestas
        this.miRutaEstudiante.get('/getAll/:codUsuario', UsuariosRespuestasControlador_1.default.listarEncuestas);
        //Responder encuestas
        this.miRutaEstudiante.post('/responderEncuesta', UsuariosRespuestasControlador_1.default.ResponderEncuestas);
        //Responder encuestas
        this.miRutaEstudiante.get('/validarRespuestas/:codEncuesta', UsuariosRespuestasControlador_1.default.validarOpcionResponder);
    }
}
const estudianteRutas = new EstudianteRutas();
exports.default = estudianteRutas.miRutaEstudiante;
