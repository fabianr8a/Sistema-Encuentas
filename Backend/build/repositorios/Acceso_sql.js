"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_ACCESO = void 0;
exports.SQL_ACCESO = {
    INICIAR_SESION_DATOS: 'SELECT u.cod_usuario,  u.nombres_usuario, a.correo_acceso, \
  u.apellidos_usuario, r.nombre_rol, r.estado_rol, u.estado_usuario \
  FROM accesos a INNER JOIN usuarios u ON u.cod_usuario = a.cod_usuario \
  INNER JOIN roles r ON r.cod_rol = u.cod_rol WHERE correo_acceso = $1 AND clave_acceso = $2',
    BUSCAR: 'SELECT correo_acceso, clave_acceso FROM accesos where cod_usuario = $1',
    MODIFICAR: 'UPDATE accesos set correo_acceso = $2, clave_acceso = $3 \
  where cod_usuario = $1;',
};
