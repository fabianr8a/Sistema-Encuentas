export const SQL_ENCUESTA = {
  LISTAR:'select  e.nombre_encuesta, e.fecha_creacion_encuesta, tdepen.nombre_tipo_dependencia, te.nombre_tipo_evento  from dependencias depen \
  inner join encuestas e \
  on e.cod_dependencia = depen.cod_dependencia \
  inner join tipo_dependencias tdepen \
  on depen.cod_dependencia = tdepen.cod_dependencia \
  inner join encuestas \
  on tdepen.cod_tipo_dependencia = encuestas.cod_tipo_dependencia \
  inner join tipo_eventos te \
  on te.cod_tipo_evento = e.cod_tipo_evento' ,

  LISTAR_EVENTOS:'SELECT cod_tipo_evento, nombre_tipo_evento \
  	FROM tipo_eventos;',

  CREAR: 'INSERT INTO roles(nombre_rol, estado_rol) VALUES ($1, 1) RETURNING cod_rol',

  MODIFICAR:'UPDATE roles SET nombre_rol=$2, estado_rol=$3 WHERE cod_rol=$1;',

  BUSCAR_ROL_MODIFICAR:'select * from roles where cod_rol=$1 ',

  BUSCAR:'select * from \
(select r.cod_rol, r.nombre_rol, r.estado_rol, \
  (select count(cod_usuario) from usuarios where cod_rol = r.cod_rol ) as cant_usuarios \
  from roles  as r \
   order by cod_rol) as prueba \
   where nombre_rol  LIKE $1 '
}
