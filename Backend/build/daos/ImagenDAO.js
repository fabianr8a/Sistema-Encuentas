"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexionBd_1 = __importDefault(require("../configuracion/conexion/conexionBd"));
const ImagenControladorVerificar_1 = __importDefault(require("../controladores/ImagenControladorVerificar"));
class ImagenDAO {
    static actualizarImagen(sqlCrearIma, sqlActualizar, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const codUsu = parametros[0];
                const nombre_publico = parametros[1];
                const nombre_privado = parametros[2];
                const tipoImagen = parametros[3];
                const nuevaImagen = yield consulta.one(sqlCrearIma, [nombre_publico, nombre_privado, tipoImagen]);
                yield consulta.none(sqlActualizar, [nuevaImagen.codImagen, codUsu]);
            }))
                .then((resultado) => {
                res.status(200).json(resultado);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error al actualizar la Imagen' });
            });
        });
    }
    static buscarUnaImagen(sqlCodImagen, sqlBuscarAll, parametro, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const tmp = yield consulta.one(sqlCodImagen, parametro);
                return yield consulta.result(sqlBuscarAll, tmp.codImagen);
            }))
                .then((resultado) => {
                const arreglo = resultado.rows;
                const imagen = ImagenControladorVerificar_1.default.buscarImagen(arreglo[0]);
                res.status(200).json(imagen);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error buscando la Imagen' });
            });
        });
    }
}
exports.default = ImagenDAO;
