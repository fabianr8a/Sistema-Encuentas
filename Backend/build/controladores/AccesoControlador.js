"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccesoDAO_1 = __importDefault(require("../daos/AccesoDAO"));
const Acceso_sql_1 = require("../repositorios/Acceso_sql");
const Registrar_Usuario_sql_1 = require("../repositorios/Registrar_Usuario_sql");
class AccesoControlador extends AccesoDAO_1.default {
    validarSesion(req, res) {
        const parametros = [req.body.correoAcceso, req.body.claveAcceso];
        AccesoControlador.iniciarSesion(Acceso_sql_1.SQL_ACCESO.INICIAR_SESION_DATOS, parametros, res);
    }
    crearUsuario(req, res) {
        const parametros = [
            req.body[0].correoRegistro,
            req.body[0].nombresRegistro,
            req.body[0].apellidosRegistro,
            req.body[0].documentoRegistro,
            req.body[0].telefonoRegistro,
            req.body[0].codTipoDependencia,
            req.body[0].claveRegistro,
        ];
        AccesoControlador.crearElUsuario(Registrar_Usuario_sql_1.SQL_REG_USU.EXISTE_CORREO, Registrar_Usuario_sql_1.SQL_REG_USU.AGREGAR_USUARIO, Registrar_Usuario_sql_1.SQL_REG_USU.AGREGAR_ACCESO, Registrar_Usuario_sql_1.SQL_REG_USU.TODO_LISTO, parametros, res);
    }
    buscarUnAcceso(req, res) {
        const codUsu = req.params.codUsuario;
        const losParametros = [codUsu];
        AccesoControlador.obtenerUnAcceso(Acceso_sql_1.SQL_ACCESO.BUSCAR, losParametros, res);
    }
    actualizarAcceso(req, res) {
        const codUsu = req.params.codUsuario;
        const misParametros = [
            codUsu,
            req.body.correoAcceso,
            req.body.claveAcceso,
        ];
        AccesoControlador.actualizarAcceso(Acceso_sql_1.SQL_ACCESO.MODIFICAR, misParametros, res);
    }
}
const accesoControlador = new AccesoControlador();
exports.default = accesoControlador;
