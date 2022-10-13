"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImagenDAO_1 = __importDefault(require("../daos/ImagenDAO"));
const Imagenes_sql_1 = require("../repositorios/Imagenes_sql");
const ImagenControladorVerificar_1 = __importDefault(require("./ImagenControladorVerificar"));
const nanoid_1 = require("nanoid");
class ImagenControlador extends ImagenDAO_1.default {
    buscarUnaImagen(req, res) {
        const codUsu = req.params.codUsuario;
        const losParametros = [codUsu];
        ImagenControlador.buscarUnaImagen(Imagenes_sql_1.SQL_IMA.BUSCAR_COD_IMAGEN, Imagenes_sql_1.SQL_IMA.BUSCAR_IMAGEN, losParametros, res);
    }
    actualizarImagen(req, res) {
        const codUsu = req.params.codUsuario;
        const sing = '_IMA';
        const stringAle = (0, nanoid_1.nanoid)(5);
        console.log(codUsu);
        const nombrePrivado = codUsu + sing + stringAle + '.' + req.body.tipoImagen.split('/')[1];
        ImagenControladorVerificar_1.default.crearImagen(nombrePrivado, req.body.base64);
        const misParametros = [
            codUsu,
            req.body.nombrepublicoImagen,
            nombrePrivado,
            req.body.tipoImagen,
        ];
        ImagenControlador.actualizarImagen(Imagenes_sql_1.SQL_IMA.CREAR_IMAGEN, Imagenes_sql_1.SQL_IMA.MODIFICAR_USUARIO_IMAGEN, misParametros, res);
    }
}
const imagenControlador = new ImagenControlador();
exports.default = imagenControlador;
