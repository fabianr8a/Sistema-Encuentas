"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioDAO_1 = __importDefault(require("../daos/UsuarioDAO"));
const Usuario_sql_1 = require("../repositorios/Usuario_sql");
const RegistrarUsuario_sql_1 = require("../repositorios/RegistrarUsuario_sql");
class UsuarioControlador extends UsuarioDAO_1.default {
    obtenerTodosUsuario(req, res) {
        UsuarioControlador.obtenerTodosUsu(Usuario_sql_1.SQL_USUARIO.TODOS, req, res);
    }
    crearUsuario(req, res) {
        const misParametros = [
            req.body.codRol,
            req.body.documentoUsuario,
            req.body.tipoDocumentoUsuario,
            req.body.nombresUsuario,
            req.body.apellidosUsuario,
            req.body.telefonoUsuario,
            req.body.correoAcceso,
            req.body.claveUsuario,
        ];
        UsuarioControlador.crearUsuario(RegistrarUsuario_sql_1.SQL_REG_USU.EXISTE_CORREO, Usuario_sql_1.SQL_USUARIO.CREAR, RegistrarUsuario_sql_1.SQL_REG_USU.AGREGAR_ACCESO, RegistrarUsuario_sql_1.SQL_REG_USU.TODO_LISTO, misParametros, res);
    }
    actualizarUsuario(req, res) {
        const misParametros = [
            req.body.codRol,
            req.body.documentoUsuario,
            req.body.tipoDocumentoUsuario,
            req.body.nombresUsuario,
            req.body.apellidosUsuario,
            req.body.telefonoUsuario,
            req.body.estadoUsuario,
            req.body.codUsuario
        ];
        UsuarioControlador.actualizarUsuario(Usuario_sql_1.SQL_USUARIO.MODIFICAR, misParametros, res);
    }
    buscarUnUsuario(req, res) {
        const codUsu = req.params.codUsuario;
        const losParametros = [codUsu];
        UsuarioControlador.buscarUnUsuario(Usuario_sql_1.SQL_USUARIO.BUSCAR_USUARIO, losParametros, res);
    }
}
const usuarioControlador = new UsuarioControlador();
exports.default = usuarioControlador;
