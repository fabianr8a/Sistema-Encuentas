export const SQL_ENCUESTA = {
  LISTAR: 'SELECT u.cod_usuario, u.cod_encuesta,e.descripcion_encuesta, e.nombre_encuesta, to_char(e.fecha_creacion_encuesta::date,\'dd/mm/yyyy\') as fecha_creacion_encuesta, \
  to_char(e.fecha_cierre_encuesta::date,\'dd/mm/yyyy\') as fecha_cierre_encuesta,te.nombre_tipo_evento \
  from usuario_encuestas as u \
  inner join encuestas as e  \
  on e.cod_encuesta = u.cod_encuesta \
  inner join tipo_eventos as te \
  on e.cod_tipo_evento = te.cod_tipo_evento \
  where u.cod_usuario=$1 \
  order by e.fecha_creacion_encuesta DESC',

  LISTAR_EVENTOS: 'SELECT * FROM tipo_eventos',

  LISTAR_TIPO_PREGUNTAS: 'select * from tipo_preguntas',

  LISTAR_DEPENDENCIAS: 'select * from dependencias',

  LISTAR_TIPO_DEPENDENCIAS: 'select * from tipo_dependencias',

  CREAR_ENCUESTA: 'INSERT INTO encuestas(cod_tipo_dependencia, cod_tipo_evento, nombre_encuesta, fecha_creacion_encuesta, fecha_cierre_encuesta, descripcion_encuesta) \
	VALUES ($1, $2, $3, $4, $5, $6) RETURNING cod_encuesta',

  SELECCIONAR_ENCUESTA_MODIFICAR: 'SELECT cod_encuesta, cod_tipo_dependencia, cod_tipo_evento, nombre_encuesta,\
   descripcion_encuesta,  to_char(fecha_creacion_encuesta::date,\'yyyy-MM-dd\') as fecha_creacion_encuesta, \
  to_char(fecha_cierre_encuesta::date,\'yyyy-MM-dd\') as fecha_cierre_encuesta \
  FROM encuestas  \
  where cod_encuesta=$1',

  MODIFICAR_ENCUESTA: 'UPDATE encuestas SET cod_tipo_dependencia=$2, cod_tipo_evento=$3, nombre_encuesta=$4, descripcion_encuesta=$5, fecha_creacion_encuesta=$6, fecha_cierre_encuesta=$7\
  WHERE cod_encuesta=$1',
}
