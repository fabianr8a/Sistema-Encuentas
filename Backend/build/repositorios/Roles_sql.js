"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_ROL = void 0;
exports.SQL_ROL = {
    TODOS: 'select r.cod_rol, r.nombre_rol, r.estado_rol, \
  (select count(cod_usuario) from usuarios where cod_rol = r.cod_rol) as cant_usuarios \
  from roles as r \
  order by cod_rol',
    ELIMINAR: 'DELETE FROM roles WHERE cod_rol = $1',
    CREAR: 'INSERT INTO roles(nombre_rol, estado_rol) VALUES ($1, 1) RETURNING cod_rol',
    MODIFICAR: 'UPDATE roles SET nombre_rol=$2, estado_rol=$3 WHERE cod_rol=$1;',
    BUSCAR_ROL_MODIFICAR: 'select * from roles where cod_rol=$1 ',
};
