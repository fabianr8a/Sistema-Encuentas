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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const conexionBd_1 = __importDefault(require("../configuracion/conexion/conexionBd"));
class AccesoDAO {
    static iniciarSesion(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const fila = yield consulta.result(sql, parametros);
                return fila;
            })).then((fila) => {
                const arreglo = fila.rows;
                if (arreglo.length == 0) {
                    res.status(400).json({ msg: 'Usuario no encontrado' });
                }
                else {
                    const miTokencito = jsonwebtoken_1.default.sign({ datos: arreglo, alg: 'HS256', typ: 'JWT' }, 'LaClaveSuperSecreta');
                    res.status(200).json({ tokenFullStack: miTokencito, nombreRol: arreglo[0].nombreRol, estadoRol: arreglo[0].estadoRol });
                }
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ msg: 'Error en la consulta' });
            });
        });
    }
    static crearElUsuario(sqlExiste, sqlAgreUsu, sqlAgreAcceso, sqlAgreIngreso, sqlTodoListo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const correito = parametros[0];
                const correo = yield consulta.one(sqlExiste, correito);
                if (correo.existe == 0) {
                    const nombres = parametros[1];
                    const apellidos = parametros[2];
                    const documento = parametros[3];
                    const nuevoUsuario = yield consulta.one(sqlAgreUsu, [documento, nombres, apellidos]);
                    const clavecita = parametros[4];
                    yield consulta.none(sqlAgreAcceso, [nuevoUsuario.codUsuario, correito, clavecita]);
                    yield consulta.none(sqlAgreIngreso, [nuevoUsuario.codUsuario]);
                    return yield consulta.result(sqlTodoListo, [nuevoUsuario.codUsuario]);
                }
                else {
                    return yield consulta.result(sqlTodoListo, [-1]);
                }
            }))
                .then(resultado => {
                const arreglo = resultado.rows;
                const codUsuarioNuevo = arreglo[0].codUsuario;
                const rolUsuarioNuevo = arreglo[0].nombreRol;
                const correoUsuarioNuevo = arreglo[0].correoAcceso;
                if (arreglo.length > 0) {
                    const miTokencito = jsonwebtoken_1.default.sign({
                        codUsuario: codUsuarioNuevo,
                        nombreRol: rolUsuarioNuevo,
                        correoAcceso: correoUsuarioNuevo
                    }, 'LaClaveSuperSecreta');
                    res.status(200).json({ token: miTokencito });
                }
                else {
                    res.status(400).json({ mensaje: 'No funciona' });
                }
            })
                .catch((miError) => {
                if (miError.code == '23505') {
                    res.status(403).json({ respuesta: 'El documento ya existe' });
                }
                else {
                    console.log(miError);
                    res.status(400).json({ msg: 'Error en la creación del usuario' });
                }
            });
        });
    }
}
exports.default = AccesoDAO;
