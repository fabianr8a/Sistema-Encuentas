"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RolControlador_1 = __importDefault(require("../controladores/RolControlador"));
class RolRutas {
    constructor() {
        this.miRutaRol = (0, express_1.Router)();
        this.listadoRutas();
    }
    listadoRutas() {
        this.miRutaRol.get('/getAll', RolControlador_1.default.obtenerTodosRoles);
        /*this.miRutaRol.get('/', rolControlador.obtenerTodosRoles);
        this.miRutaRol.get('/:codRol', rolControlador.buscarUnosRoles);*/
        this.miRutaRol.delete('/delete/:codigo', RolControlador_1.default.eliminarRol);
        this.miRutaRol.post('/create', RolControlador_1.default.crearRol);
        this.miRutaRol.post('/buscar', RolControlador_1.default.buscarRoles);
        this.miRutaRol.put('/actualizar/:codRol', RolControlador_1.default.modificarRol);
        this.miRutaRol.get('/buscar-rol/:codRol', RolControlador_1.default.buscarUnosRoles);
    }
}
const rolRutas = new RolRutas();
exports.default = rolRutas.miRutaRol;
