"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioControlador_1 = __importDefault(require("../controladores/UsuarioControlador"));
const AccesoControlador_1 = __importDefault(require("../controladores/AccesoControlador"));
const ImagenControlador_1 = __importDefault(require("../controladores/ImagenControlador"));
class UsuarioRutas {
    constructor() {
        this.miRutaUsuario = (0, express_1.Router)();
        this.listadoRutas();
    }
    listadoRutas() {
        this.miRutaUsuario.get('/getAll', UsuarioControlador_1.default.obtenerTodosUsuario);
        this.miRutaUsuario.post('/create', UsuarioControlador_1.default.crearUsuario);
        this.miRutaUsuario.put('/actualizar/:codUsuario', UsuarioControlador_1.default.actualizarUsuario);
        this.miRutaUsuario.put('/actualizar-acceso/:codUsuario', AccesoControlador_1.default.actualizarAcceso);
        this.miRutaUsuario.get('/buscar-usuario/:codUsuario', UsuarioControlador_1.default.buscarUnUsuario);
        this.miRutaUsuario.get('/buscar-acceso/:codUsuario', AccesoControlador_1.default.buscarUnAcceso);
        this.miRutaUsuario.get('/buscar-imagen/:codUsuario', ImagenControlador_1.default.buscarUnaImagen);
        this.miRutaUsuario.put('/actualizar-imagen/:codUsuario', ImagenControlador_1.default.actualizarImagen);
    }
}
const usuarioRutas = new UsuarioRutas();
exports.default = usuarioRutas.miRutaUsuario;
