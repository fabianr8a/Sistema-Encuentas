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
class EstudianteDAO {
    static listarLasEncuestas(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sql, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error en la consulta de encuestas estudiantes' });
            });
        });
    }
    static ResponderEncuesta(sqlResponderFecha, sqlResponderAbierta, sqlResponderOpcion, parametrosEncuesta, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                for (const encuesta of parametrosEncuesta) {
                    if (encuesta.respuestaAbierta != '') {
                        const arregloEncuestaAbierta = [encuesta.codUsuario, encuesta.codPregunta, encuesta.respuestaAbierta];
                        yield consulta.none(sqlResponderAbierta, arregloEncuestaAbierta);
                    }
                    if (encuesta.respuestaFecha != '') {
                        const arregloEncuestaFecha = [encuesta.codUsuario, encuesta.codPregunta, encuesta.respuestaFecha];
                        yield consulta.none(sqlResponderFecha, arregloEncuestaFecha);
                    }
                    if (encuesta.codOpcion != 0) {
                        const arregloEncuestasOpcion = [encuesta.codUsuario, encuesta.codPregunta, encuesta.codOpcion];
                        yield consulta.none(sqlResponderOpcion, arregloEncuestasOpcion);
                    }
                }
            })).then((resultado) => {
                res.status(200).json({
                    respuesta: "Encuesta Contestada",
                    resultado: resultado
                });
            }).catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error al responder la encuesta' });
            });
        });
    }
}
exports.default = EstudianteDAO;
