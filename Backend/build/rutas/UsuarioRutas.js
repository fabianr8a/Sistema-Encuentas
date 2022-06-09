"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioControlador_1 = __importDefault(require("../controladores/UsuarioControlador"));
class UsuarioRutas {
    constructor() {
        this.miRutaUsuario = (0, express_1.Router)();
        this.listadoRutas();
    }
    listadoRutas() {
        this.miRutaUsuario.get('/getAll', UsuarioControlador_1.default.obtenerTodosLosUsuarios);
    }
}
const usuarioRutas = new UsuarioRutas();
exports.default = usuarioRutas.miRutaUsuario;
