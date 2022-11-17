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
class OpcionDAO {
    static crearLasOpciones(sqlOpcion, parametrosOpcion, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sqlOpcion, parametrosOpcion)
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
    static eliminarOpcion(sqlEliminar, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sqlEliminar, parametros)
                .then((resultado) => {
                res.status(200).json({ respuesta: "Opcion eliminada",
                    resultado: resultado.rowCount });
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error eliminando opcion' });
            });
        });
    }
    static seleccionarOpcion(sqlSeleccionar, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.oneOrNone(sqlSeleccionar, parametros)
                .then((resultado) => {
                if (!resultado) {
                    res.status(400).json({ respuesta: 'Error seleccionando la opcion' });
                }
                res.status(200).json(resultado);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error seleccionando la opcion' });
            });
        });
    }
    static modificarOpcion(sqlModificar, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                return yield consulta.result(sqlModificar, parametros);
            }))
                .then(() => {
                res.status(200).json({ respuesta: "Opcion modificada",
                });
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error modificando la opcion' });
            });
        });
    }
}
exports.default = OpcionDAO;
