"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_ACCESO = void 0;
exports.SQL_ACCESO = {
    INICIAR_SESION_DATOS: 'SELECT u.cod_usuario,  u.nombres_usuario, \
  u.apellidos_usuario, r.nombre_rol FROM accesos a INNER JOIN usuarios u ON u.cod_usuario = a.cod_usuario \
  INNER JOIN roles r ON r.cod_rol = u.cod_rol WHERE correo_acceso = $1 AND clave_acceso = $2'
};
