"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_REG_USU = void 0;
exports.SQL_REG_USU = {
    EXISTE_CORREO: 'select count(a.cod_usuario) as existe from accesos a \
    where a.correo_acceso = $1',
    AGREGAR_USUARIO: 'INSERT INTO usuarios(cod_rol, documento_usuario, \
  tipo_documento_usuario, nombres_usuario, apellidos_usuario,telefono_usuario) \
  VALUES(1, $1, 1, $2, $3, \'Sin telefono\') \
  RETURNING cod_usuario',
    AGREGAR_ACCESO: 'INSERT INTO accesos(cod_usuario, correo_acceso, clave_acceso) \
	VALUES ($1, $2, $3);',
    AGREGAR_INGRESO: 'INSERT INTO ingresos(cod_usuario, fecha_ingreso,hora_ingreso) \
	VALUES ($1, CURRENT_DATE, CURRENT_TIME);',
    TODO_LISTO: 'SELECT u.cod_usuario, u.cod_rol, u.estado_usuario, r.nombre_rol, a.correo_acceso \
  FROM usuarios u INNER JOIN roles r ON u.cod_rol = r.cod_rol \
  INNER JOIN accesos a ON u.cod_usuario = a.cod_usuario \
  WHERE u.cod_usuario = $1'
};
