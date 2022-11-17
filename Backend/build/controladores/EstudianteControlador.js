"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstudianteDAO_1 = __importDefault(require("../daos/EstudianteDAO"));
const Estudiantes_sql_1 = require("../repositorios/Estudiantes_sql");
class EstudianteControlador extends EstudianteDAO_1.default {
    listarEncuestas(req, res) {
        const codigoUsuario = req.params.codUsuario;
        const miParametro = [codigoUsuario];
        EstudianteControlador.listarLasEncuestas(Estudiantes_sql_1.SQL_ENCUESTA_ESTUDIANTES.LISTAR_ENCUESTAS, miParametro, res);
    }
}
const estudianteControlador = new EstudianteControlador();
exports.default = estudianteControlador;
