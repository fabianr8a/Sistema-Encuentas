"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OpcionDAO_1 = __importDefault(require("../daos/OpcionDAO"));
const Opciones_sql_1 = require("../repositorios/Opciones_sql");
class OpcionControlador extends OpcionDAO_1.default {
    crearOpciones(req, res) {
        const losParametros = [req.body.textoOpcion, req.body.codPregunta];
        OpcionControlador.crearLasOpciones(Opciones_sql_1.SQL_OPCIONES.CREAR_OPCIONES, losParametros, res);
    }
    eliminarOpcion(req, res) {
        const codigo = req.params.codOpcion;
        const losParametros = [codigo];
        OpcionControlador.eliminarOpcion(Opciones_sql_1.SQL_OPCIONES.ELIMINAR_OPCIONES, losParametros, res);
    }
    seleccionarOpcion(req, res) {
        const buscarOpcion = req.params.codOpcion;
        const miParametro = [buscarOpcion];
        if (!buscarOpcion) {
            return res.status(400).json({ Error: "No se encontro un parametro" });
        }
        OpcionControlador.seleccionarOpcion(Opciones_sql_1.SQL_OPCIONES.SELECCIONAR_OPCION, miParametro, res);
    }
    modificarOpcion(req, res) {
        const codigoOpcion = req.params.codOpcion;
        const textoOpcion = req.body.textoOpcion;
        const misParametros = [codigoOpcion, textoOpcion];
        OpcionControlador.modificarOpcion(Opciones_sql_1.SQL_OPCIONES.MODIFICAR_OPCIONES, misParametros, res);
    }
}
const opcionControlador = new OpcionControlador();
exports.default = opcionControlador;
