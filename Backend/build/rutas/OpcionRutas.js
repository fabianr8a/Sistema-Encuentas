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
        this.miRutaOpcion.get('/listar/:codPregunta', OpcionControlador_1.default.seleccionarOpcion);
        //modificar
        //this.miRutaOpcion.put('/modificar/:codPregunta', opcionControlador.modificarOpcion);
        //eliminar opcion
        //this.miRutaOpcion.delete('/eliminar/:codPregunta', opcionControlador.eliminarOpcion);
    }
}
const opcionRutas = new OpcionRutas();
exports.default = opcionRutas.miRutaOpcion;
