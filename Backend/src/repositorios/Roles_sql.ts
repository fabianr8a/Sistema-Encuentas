export const SQL_ROL = {
  TODOS: 'select r.cod_rol, r.nombre_rol, r.estado_rol, \
  (select count(cod_usuario) from usuarios where cod_rol = r.cod_rol) as cant_usuarios \
  from roles as r \
  order by cod_rol',

  ELIMINAR: 'DELETE FROM roles WHERE cod_rol = $1',

  CREAR: 'INSERT INTO roles(nombre_rol, estado_rol) VALUES ($1, 1) RETURNING cod_rol',

  BUSCAR:'select * from \
(select r.cod_rol, r.nombre_rol, r.estado_rol, \
  (select count(cod_usuario) from usuarios where cod_rol = r.cod_rol ) as cant_usuarios \
  from roles  as r \
   order by cod_rol) as prueba \
   where nombre_rol  LIKE $1 '
}
