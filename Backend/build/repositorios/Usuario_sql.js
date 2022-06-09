"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_USUARIO = void 0;
exports.SQL_USUARIO = {
    LISTAR: 'SELECT u.cod_usuario, r.nombre_rol, u.documento_usuario,u.correo_usuario, u.tipo_documento_usuario, u.nombres_usuario, u.apellidos_usuario, u.telefono_usuario, u.nick_name, u.estado_usuario, \
  (select count (cod_rol) from roles where cod_rol=u.cod_rol) as cant_usuarios \
	FROM usuarios as u \
  inner join roles as r \
	on u.cod_rol=r.cod_rol \
	order by cod_usuario',
}
