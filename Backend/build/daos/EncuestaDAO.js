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
class EncuestaDAO {
    static listarLasEncuestas(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sql, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error en la consulta de encuestas' });
            });
        });
    }
    static listarLosEventos(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sql, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error en la consulta de eventos' });
            });
        });
    }
    static listarLasTipoPreguntas(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sql, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error en la consulta de tipo preguntas' });
            });
        });
    }
    static listarLasDependencias(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sql, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error en la consulta de dependencias' });
            });
        });
    }
    static listarLosTiposDependencia(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sql, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error listando el tipo dependencia' });
            });
        });
    }
    static crearEncuesta(sqlCrear, sqlPregunta, sqlOpcion, sqlUsuarioEncuesta, parametros, parametrosPregunta, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const codigoEncuesta = yield consulta.one(sqlCrear, parametros);
                parametrosPregunta.map((pregunta) => __awaiter(this, void 0, void 0, function* () {
                    const arregloPregunta = [pregunta.codTipoPregunta, codigoEncuesta.codEncuesta, pregunta.descripcionPregunta];
                    let codigoPregunta = yield consulta.one(sqlPregunta, arregloPregunta);
                    if (pregunta.codTipoPregunta === 3) {
                        pregunta.arregloOpciones.map((opcion) => __awaiter(this, void 0, void 0, function* () {
                            const arregloOpciones = [codigoPregunta.codPregunta, opcion.textoOpcion];
                            yield consulta.none(sqlOpcion, arregloOpciones);
                        }));
                    }
                    ;
                }));
                const arregloUsuarioEncuestas = [parametros[6], codigoEncuesta.codEncuesta];
                return yield consulta.result(sqlUsuarioEncuesta, arregloUsuarioEncuestas);
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
    static crearLasPreguntas(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sql, parametros)
                .then((resultado) => {
                res.status(200).json({
                    respuesta: "Pregunta creada",
                    resultado: resultado.rowCount
                });
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error creando las preguntas' });
            });
        });
    }
    static crearLasOpciones(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sql, parametros)
                .then((resultado) => {
                res.status(200).json({
                    respuesta: "Opciones creadas",
                    resultado: resultado.rowCount
                });
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error creando las opciones' });
            });
        });
    }
    //encuesta que se va a modificar
    static seleccionEncuestaModificar(sqlBuscar, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.oneOrNone(sqlBuscar, parametros)
                .then((resultado) => {
                if (!resultado) {
                    res.status(400).json({ respuesta: 'Error seleccionando la encuesta a modificar' });
                }
                res.status(200).json(resultado);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error seleccionando la encuesta a modificar' });
            });
        });
    }
    //modificar la encuesta seleccionada
    static modificarLaEncuesta(sqlModificar, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                return yield consulta.result(sqlModificar, parametros);
            }))
                .then(() => {
                res.status(200).json({
                    respuesta: "Encuesta modificada",
                });
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error modificando la encuesta' });
            });
        });
    }
}
exports.default = EncuestaDAO;
