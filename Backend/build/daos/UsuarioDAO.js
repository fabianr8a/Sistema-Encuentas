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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nanoid_1 = require("nanoid");
class UsuarioDAO {
    static obtenerTodosUsuarios(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.result(sql, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: 'Error en la consulta de usuarios' });
            });
        });
    }
    static creeloYaPorfis(sqlExiste, sqlAgreUsu, sqlAgreAcceso, sqlAgreIngreso, sqlTodoListo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBd_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const correito = parametros[0];
                const correo = yield consulta.one(sqlExiste, correito);
                //console.log(cantidadCorreos);
                if (correo.existe == 0) {
                    const nombres = parametros[1];
                    const apellidos = parametros[2];
                    const documento = 'NOTIENE_' + (0, nanoid_1.nanoid)(15);
                    const nuevoUsuario = yield consulta.one(sqlAgreUsu, [documento, nombres, apellidos]);
                    const clavecita = parametros[3];
                    yield consulta.none(sqlAgreAcceso, [nuevoUsuario.codUsuario, correito, clavecita]);
                    yield consulta.none(sqlAgreIngreso, [nuevoUsuario.codUsuario]);
                    //Nos falta analizar el return
                    return yield consulta.result(sqlTodoListo, [nuevoUsuario.codUsuario]);
                }
                else {
                    return yield consulta.result(sqlTodoListo, [-1]);
                }
            }))
                .then(resultado => {
                const arreglo = resultado.rows;
                const codUsuaioNuevo = arreglo[0].codUsuario;
                const rolUsuaioNuevo = arreglo[0].nombreRol;
                const correoUsuarioNuevo = arreglo[0].correoAcceso;
                if (arreglo.length > 0) {
                    const miTokencito = jsonwebtoken_1.default.sign({ codUsuario: codUsuaioNuevo,
                        nombreRol: rolUsuaioNuevo,
                        correoAcceso: correoUsuarioNuevo }, 'LaClaveSuperSecreta');
                    res.status(200).json({ tokenFullStack: miTokencito, foticoFullStack: 'Acá va el base 64 de la foto' });
                }
                else {
                    res.status(400).json({ mensaje: 'No funciona' });
                }
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ msg: 'Error en la creación del usuario' });
            });
        });
    }
}
exports.default = UsuarioDAO;
