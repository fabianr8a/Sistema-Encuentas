"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RolDAO_1 = __importDefault(require("../daos/RolDAO"));
const Roles_sql_1 = require("../repositorios/Roles_sql");
class RolControlador extends RolDAO_1.default {
    obtenerTodosRoles(req, res) {
        RolControlador.obtenerTodos(Roles_sql_1.SQL_ROL.TODOS, req, res);
    }
    buscarRoles(req, res) {
        const buscar = req.body.nombreRol;
        const miParametro = [buscar];
        console.log(req.body, 'este es el buscar');
        if (buscar === '') {
            RolControlador.obtenerTodos(Roles_sql_1.SQL_ROL.TODOS, req, res);
        }
        else {
            RolControlador.buscarRol(Roles_sql_1.SQL_ROL.BUSCAR, miParametro, res);
        }
    }
    eliminarRol(req, res) {
        console.log(req);
        const codiguito = req.params.codigo;
        const losParametros = [codiguito];
        RolControlador.eliminarRol(Roles_sql_1.SQL_ROL.ELIMINAR, losParametros, res);
    }
    crearRol(req, res) {
        const misParametros = [req.body.nombreRol];
        RolControlador.crearRol(Roles_sql_1.SQL_ROL.CREAR, misParametros, res);
    }
}
const rolControlador = new RolControlador();
exports.default = rolControlador;
