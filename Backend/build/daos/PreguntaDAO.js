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
    static seleccionarPregunta(sqlPregunta, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sqlPregunta, parametros)
                .then((resultado) => {
                if (!resultado) {
                    res.status(400).json({ respuesta: 'Error seleccionando la pregunta a modificar' });
                }
                res.status(200).json(resultado.rows);
                console.log(resultado);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error seleccionando la pregunta a modificar' });
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
}
exports.default = PreguntaDAO;