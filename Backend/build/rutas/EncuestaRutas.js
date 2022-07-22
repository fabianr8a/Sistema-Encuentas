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
        this.miRutaEncuesta.get('/getAll', EncuestaControlador_1.default.listarEncuestas);
        this.miRutaEncuesta.get('/eventos', EncuestaControlador_1.default.listarEventos);
    }
}
const encuestaRutas = new EncuestaRutas();
exports.default = encuestaRutas.miRutaEncuesta;
