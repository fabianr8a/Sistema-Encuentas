"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_ENCUESTA_ESTUDIANTES = void 0;
exports.SQL_ENCUESTA_ESTUDIANTES = {
    LISTAR_ENCUESTAS: 'select e.cod_encuesta, e.cod_tipo_dependencia, e.nombre_encuesta, te.nombre_tipo_evento, \
  to_char(e.fecha_creacion_encuesta::date,\'dd/mm/yyyy\') as fecha_creacion_encuesta, \
  to_char(e.fecha_cierre_encuesta::date,\'dd/mm/yyyy\') as fecha_cierre_encuesta, e.descripcion_encuesta, \
  te.nombre_tipo_evento \
  from encuestas as e \
  inner join usuarios as u \
  on e.cod_tipo_dependencia=u.cod_tipo_dependencia \
  inner join tipo_eventos as te \
  on e.cod_tipo_evento=te.cod_tipo_evento \
  where (u.cod_usuario=$1) and (e.fecha_cierre_encuesta >= current_date) \
  order by e.fecha_cierre_encuesta ASC',
};
