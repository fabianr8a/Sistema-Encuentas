"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioDAO_1 = __importDefault(require("../daos/UsuarioDAO"));
const Usuario_sql_1 = require("../repositorios/Usuario_sql");
const CrearUsuario_sql_1 = require("../repositorios/CrearUsuario_sql");
class UsuarioControlador extends UsuarioDAO_1.default {

    obtenerTodosLosUsuarios(req, res) {
        UsuarioControlador.obtenerTodosUsuarios(Usuario_sql_1.SQL_USUARIO.LISTAR, req, res);
    }
  
}
const usuarioControlador = new UsuarioControlador();
exports.default = usuarioControlador;
