"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OpcionDAO_1 = __importDefault(require("../daos/OpcionDAO"));
const Opciones_sql_1 = require("../repositorios/Opciones_sql");
class OpcionControlador extends OpcionDAO_1.default {
    crearOpciones(req, res) {
        const losParametros = [
            req.body.textoOpcion,
            req.body.codPregunta,
        ];
        OpcionControlador.crearLasOpciones(Opciones_sql_1.SQL_OPCIONES.CREAR_OPCIONES, losParametros, res);
    }
}
const opcionControlador = new OpcionControlador();
exports.default = opcionControlador;
