"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EncuestaDAO_1 = __importDefault(require("../daos/EncuestaDAO"));
const Encuestas_sql_1 = require("../repositorios/Encuestas_sql");
class EncuestaControlador extends EncuestaDAO_1.default {
    listarEncuestas(req, res) {
        EncuestaControlador.listarLasEncuestas(Encuestas_sql_1.SQL_ENCUESTA.LISTAR, req, res);
    }
    listarEventos(req, res) {
        EncuestaControlador.listarLosEventos(Encuestas_sql_1.SQL_ENCUESTA.LISTAR_EVENTOS, req, res);
    }
}
const encuestaControlador = new EncuestaControlador();
exports.default = encuestaControlador;
