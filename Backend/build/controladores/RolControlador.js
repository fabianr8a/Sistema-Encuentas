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
    modificarRol(req, res) {
        const codigoRol = req.params.codRol;
        const nombreRol = req.body.nombreRol;
        const estadoRol = req.body.estadoRol;
        const misParametros = [codigoRol, nombreRol, estadoRol];
        RolControlador.modificarRol(Roles_sql_1.SQL_ROL.MODIFICAR, misParametros, res);
    }
    buscarUnosRoles(req, res) {
        const buscarRol = req.params.codRol;
        const miParametro = [buscarRol];
        console.log(req.body, 'este es el buscar');
        if (!buscarRol) {
            return res.status(400).json({ 'Error': 'No se encontro un parametro' });
        }
        RolControlador.buscarUnRol(Roles_sql_1.SQL_ROL.BUSCARROL, miParametro, res);
    }
}
const rolControlador = new RolControlador();
exports.default = rolControlador;
