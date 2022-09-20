export const SQL_ENCUESTA = {
  LISTAR: 'SELECT u.cod_usuario, u.cod_encuesta,e.descripcion_encuesta, e.nombre_encuesta, to_char(e.fecha_creacion_encuesta::date,\'dd/mm/yyyy\') as fecha_creacion_encuesta, \
  e.fecha_cierre_encuesta,te.nombre_tipo_evento \
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

  LISTAR_TIPO_DEPENDENCIAS: 'select * from tipo_dependencias \
  where cod_dependencia =$1',

  CREAR_ENCUESTA: 'INSERT INTO encuestas(cod_dependencia, cod_tipo_evento, nombre_encuesta, fecha_creacion_encuesta, fecha_cierre_encuesta, descripcion_encuesta) \
	VALUES ($1, $2, $3, $4, $5, $6) RETURNING cod_encuesta',

  CREAR_PREGUNTAS: 'INSERT INTO preguntas(cod_tipo_pregunta, cod_encuesta, descripcion_pregunta) \
	VALUES ($1,$2,$3) RETURNING cod_pregunta',

  CREAR_OPCIONES: 'INSERT INTO opciones(cod_pregunta, texto_opcion) VALUES ($1,$2)',

  CREAR_USUARIO_ENCUESTAS: 'INSERT INTO usuario_encuestas(cod_usuario, cod_encuesta)VALUES ($1, $2)',

  SELECCIONAR_ENCUESTA_MODIFICAR: 'SELECT cod_encuesta, cod_dependencia, cod_tipo_evento, nombre_encuesta,\
   descripcion_encuesta,  to_char(fecha_creacion_encuesta::date,\'yyyy-MM-dd\') as fecha_creacion_encuesta, \
  to_char(fecha_cierre_encuesta::date,\'yyyy-MM-dd\') as fecha_cierre_encuesta FROM encuestas where cod_encuesta=$1;',

  MODIFICAR_ENCUESTA: 'UPDATE encuestas SET cod_dependencia=$2, cod_tipo_evento=$3, nombre_encuesta=$4, descripcion_encuesta=$5, fecha_creacion_encuesta=$6, fecha_cierre_encuesta=$7\
  WHERE cod_encuesta=$1',

  BUSCAR_FACULTAD: 'select e.cod_encuesta, e.descripcion_encuesta, e.nombre_encuesta, \
  e.fecha_cierre_encuesta, te.nombre_tipo_evento  from tipo_eventos te \
  inner join encuestas e \
  on te.cod_tipo_evento = e.cod_tipo_evento \
  where te.cod_tipo_evento=1 \
  order by e.fecha_creacion_encuesta DESC',

}
