"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EncuestaControlador_1 = __importDefault(require("../controladores/EncuestaControlador"));
class EncuestaRutas {
    constructor() {
        this.miRutaEncuesta = (0, express_1.Router)();
        this.listadoRutas();
    }
    listadoRutas() {
        //listar encuestas
        this.miRutaEncuesta.get('/getAll/:codUsuario', EncuestaControlador_1.default.listarEncuestas);
        //obtener tipo de eventos
        this.miRutaEncuesta.get('/eventos', EncuestaControlador_1.default.listarEventos);
        //obtener tipo de preguntas
        this.miRutaEncuesta.get('/tipoPreguntas', EncuestaControlador_1.default.listarTipoPreguntas);
        //obtener dependencias
        this.miRutaEncuesta.get('/dependencias', EncuestaControlador_1.default.listarDependencias);
        //obtener tipo dependencias
        this.miRutaEncuesta.get('/tipoDependencias', EncuestaControlador_1.default.listarTiposDependencia);
        //crear encuestas
        this.miRutaEncuesta.post('/crear', EncuestaControlador_1.default.crearEncuesta);
        //seleccionar encuesta para modificar
        this.miRutaEncuesta.get('/encuestas/:codEncuesta', EncuestaControlador_1.default.seleccionarEncuestaModificar);
        //modificar encuesta
        this.miRutaEncuesta.put('/modificar/:codEncuesta', EncuestaControlador_1.default.modificarEncuesta);
        //eliminar encuesta
        this.miRutaEncuesta.delete('/eliminar/:codEncuesta', EncuestaControlador_1.default.eliminarEncuesta);
    }
}
const encuestaRutas = new EncuestaRutas();
exports.default = encuestaRutas.miRutaEncuesta;
