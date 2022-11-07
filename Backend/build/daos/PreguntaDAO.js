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
    static crearPregunta(sqlPregunta, sqlOpcion, parametrosPregunta, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                for (const preguntica of parametrosPregunta) {
                    const arregloPregunta = [preguntica.codTipoPregunta, preguntica.codEncuesta, preguntica.descripcionPregunta];
                    let codigoPregunta = yield consulta.one(sqlPregunta, arregloPregunta);
                    if (Number(preguntica.codTipoPregunta) === 3) {
                        yield this.guardarOpciones(sqlOpcion, preguntica.arregloOpciones, codigoPregunta.codPregunta);
                    }
                    else {
                        let opcion = [codigoPregunta.codPregunta, " Default"];
                        yield consulta.none(sqlOpcion, opcion);
                    }
                }
            })).then((resultado) => {
                res.status(200).json({
                    respuesta: "Preguntas creadas",
                    resultado: resultado
                });
            }).catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error creando las preguntas' });
            });
        });
    }
    static guardarOpciones(sqlOpciones, arregloOpciones, codPregunta) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                for (const objOpcion of arregloOpciones) {
                    let opcion = [codPregunta, objOpcion.textoOpcion];
                    yield consulta.none(sqlOpciones, opcion);
                }
            }));
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
