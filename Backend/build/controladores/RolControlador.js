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
    eliminarRol(req, res) {
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
        if (!buscarRol) {
            return res.status(400).json({ 'Error': 'No se encontro un parametro' });
        }
        RolControlador.buscarUnRolModificar(Roles_sql_1.SQL_ROL.BUSCAR_ROL_MODIFICAR, miParametro, res);
    }
    buscarNombreRoles(req, res) {
        RolControlador.obtenerNombresRol(Roles_sql_1.SQL_ROL.BUSCAR_ROL, req, res);
    }
}
const rolControlador = new RolControlador();
exports.default = rolControlador;
