"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EstudianteControlador_1 = __importDefault(require("../controladores/EstudianteControlador"));
class EstudianteRutas {
    constructor() {
        this.miRutaEstudiante = (0, express_1.Router)();
        this.listadoRutas();
    }
    listadoRutas() {
        //listar encuestas
        this.miRutaEstudiante.get('/getAll/:codUsuario', EstudianteControlador_1.default.listarEncuestas);
    }
}
const estudianteRutas = new EstudianteRutas();
exports.default = estudianteRutas.miRutaEstudiante;
