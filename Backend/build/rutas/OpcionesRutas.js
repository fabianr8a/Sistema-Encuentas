"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OpcionControlador_1 = __importDefault(require("../controladores/OpcionControlador"));
class OpcionRutas {
    constructor() {
        this.miRutaOpcion = (0, express_1.Router)();
        this.listadoRutas();
    }
    listadoRutas() {
        //seleccionar opcion
        this.miRutaOpcion.get('/seleccionar/:codOpcion', OpcionControlador_1.default.seleccionarOpcion);
        //modificar
        this.miRutaOpcion.put('/modificar/:codOpcion', OpcionControlador_1.default.modificarOpcion);
        //eliminar opcion
        this.miRutaOpcion.delete('/eliminar/:codOpcion', OpcionControlador_1.default.eliminarOpcion);
        //agregar opcion
        this.miRutaOpcion.post('/crear', OpcionControlador_1.default.crearOpciones);
    }
}
const opcionRutas = new OpcionRutas();
exports.default = opcionRutas.miRutaOpcion;
