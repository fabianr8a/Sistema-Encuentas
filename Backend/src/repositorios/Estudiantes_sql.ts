export const SQL_ENCUESTA_ESTUDIANTES = {
  LISTAR_ENCUESTAS:'select cod_encuesta, cod_dependencia, cod_tipo_evento, nombre_encuesta, \
  (select nombre_tipo_evento from tipo_eventos where cod_tipo_evento=e.cod_tipo_evento), \
  (select nombre_dependencia from dependencias where cod_dependencia = e.cod_dependencia), \
  (select nombre_tipo_dependencia from tipo_dependencias where cod_tipo_dependencia = e.cod_dependencia), \
  to_char(e.fecha_creacion_encuesta::date,\'dd/mm/yyyy\') as fecha_creacion_encuesta, \
  to_char(e.fecha_cierre_encuesta::date,\'dd/mm/yyyy\') as fecha_cierre_encuesta, descripcion_encuesta from encuestas as e \
  where current_date <= e.fecha_cierre_encuesta \
  order by e.fecha_cierre_encuesta ASC' ,
}
