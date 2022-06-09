"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AccesoControlador_1 = __importDefault(require("../controladores/AccesoControlador"));
class AccesoRutas {
    constructor() {
        this.rutaAcceso = (0, express_1.Router)();
        this.crearRutas();
    }
    crearRutas() {
        this.rutaAcceso.post('/login', AccesoControlador_1.default.validarSesion);
        this.rutaAcceso.post('/register', AccesoControlador_1.default.crearUsuario);
    }
}
const accesoRutas = new AccesoRutas();
exports.default = accesoRutas.rutaAcceso;
