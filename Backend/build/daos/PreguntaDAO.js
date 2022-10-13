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
class PreguntaDAO {
    static crearPregunta(parametros, sqlPregunta, sqlOpcion, parametrosPregunta, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const codigoEncuesta = parametros[1];
                parametrosPregunta.map((pregunta) => __awaiter(this, void 0, void 0, function* () {
                    const arregloPregunta = [pregunta.codTipoPregunta, codigoEncuesta.codEncuesta, pregunta.descripcionPregunta];
                    let codigoPregunta = yield consulta.one(sqlPregunta, arregloPregunta);
                    if (pregunta.codTipoPregunta == 3) {
                        pregunta.arregloOpciones.map((opcion) => __awaiter(this, void 0, void 0, function* () {
                            const arregloOpciones = [codigoPregunta.codPregunta, opcion.textoOpcion];
                            yield consulta.none(sqlOpcion, arregloOpciones);
                        }));
                    }
                    ;
                }));
            }))
                .then((resultado) => {
                res.status(200).json({
                    respuesta: "Encuesta creada",
                    resultado: resultado.rowCount
                });
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error creando la encuesta' });
            });
        });
    }
    static listarPregunta(sqlPregunta, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sqlPregunta, parametros)
                .then((resultado) => {
                if (!resultado) {
                    res.status(400).json({ respuesta: 'Error listando las preguntas' });
                }
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error listando las preguntas' });
            });
        });
    }
    static seleccionarPregunta(sqlSeleccionar, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.oneOrNone(sqlSeleccionar, parametros)
                .then((resultado) => {
                if (!resultado) {
                    res.status(400).json({ respuesta: 'Error seleccionando la pregunta' });
                }
                res.status(200).json(resultado);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error seleccionando la pregunta' });
            });
        });
    }
    static modificarPregunta(sqlModificar, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                return yield consulta.result(sqlModificar, parametros);
            }))
                .then(() => {
                res.status(200).json({
                    respuesta: "Pregunta modificada",
                });
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error modificando la pregunta' });
            });
        });
    }
    static eliminarPregunta(sqlEliminar, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sqlEliminar, parametros)
                .then((resultado) => {
                res.status(200).json({ respuesta: "Pregunta eliminada",
                    resultado: resultado.rowCount });
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error eliminando pregunta' });
            });
        });
    }
}
exports.default = PreguntaDAO;
