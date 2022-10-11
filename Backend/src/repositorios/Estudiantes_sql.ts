export const SQL_ENCUESTA_ESTUDIANTES = {
  LISTAR_ENCUESTAS:'select cod_encuesta, e.cod_tipo_dependencia, e.cod_tipo_evento, nombre_encuesta, \
  to_char(e.fecha_creacion_encuesta::date,\'dd/mm/yyyy\') as fecha_creacion_encuesta, \
  to_char(e.fecha_cierre_encuesta::date,\'dd/mm/yyyy\') as fecha_cierre_encuesta, descripcion_encuesta, \
  t.nombre_tipo_dependencia,te.nombre_tipo_evento from encuestas as e \
  inner join tipo_dependencias as t \
	on e.cod_tipo_dependencia=t.cod_tipo_dependencia inner join tipo_eventos as te \
	on e.cod_tipo_evento=te.cod_tipo_evento \
  where e.fecha_cierre_encuesta > current_date \
  order by e.fecha_cierre_encuesta ASC' ,

  LISTAR_TIPO_DEPENDENCIAS: 'select cod_tipo_dependencia,cod_dependencia, nombre_tipo_dependencia \
  from tipo_dependencias'
}
