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
class UsuarioDAO {
    static obtenerTodosUsu(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sql, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error en la consulta Usuario' });
            });
        });
    }
    static crearUsuario(sqlExiste, sqlCrearUsu, sqlAgreAcceso, sqlTodoListo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const correooo = parametros[6];
                const correo = yield consulta.one(sqlExiste, correooo);
                if (correo.existe == 0) {
                    const codigoRol = parametros[0];
                    const documento = parametros[1];
                    const tipoDocumento = parametros[2];
                    const nombres = parametros[3];
                    const apellidos = parametros[4];
                    const telefono = parametros[5];
                    const nuevoUsuario = yield consulta.one(sqlCrearUsu, [codigoRol, documento, tipoDocumento, nombres, apellidos, telefono]);
                    const clavecita = parametros[7];
                    yield consulta.none(sqlAgreAcceso, [nuevoUsuario.codUsuario, correooo, clavecita]);
                    return yield consulta.result(sqlTodoListo, [nuevoUsuario.codUsuario]);
                }
                else {
                    return yield consulta.result(sqlTodoListo, [-1]);
                }
            }))
                .then((resultado) => {
                res.status(200).json({ respuesta: "Usuario creado",
                    resultado: resultado.rowCount });
            })
                .catch((miError) => {
                if (miError.code == '23505') {
                    res.status(403).json({ respuesta: 'el documento ya existe' });
                }
                else {
                    console.log(miError);
                    res.status(400).json({ respuesta: 'Error al crear el Usuario' });
                }
            });
        });
    }
    static buscarUnUsuario(sqlBuscar, parametro, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.oneOrNone(sqlBuscar, parametro)
                .then((resultado) => {
                if (!resultado) {
                    res.status(400).json({ respuesta: 'Error buscando el Usuario' });
                }
                res.status(200).json(resultado);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error buscando el Usuario' });
            });
        });
    }
    static actualizarUsuario(sqlBuscar, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.oneOrNone(sqlBuscar, parametros)
                .then((resultado) => {
                res.status(200).json(resultado);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error al actualizar el Usuario' });
            });
        });
    }
}
exports.default = UsuarioDAO;
