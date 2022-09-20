"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_ENCUESTA_ESTUDIANTES = void 0;
exports.SQL_ENCUESTA_ESTUDIANTES = {
    LISTAR_ENCUESTAS: 'select e.cod_encuesta, e.descripcion_encuesta, e.nombre_encuesta, \
  to_char(e.fecha_creacion_encuesta::date,\'dd/mm/yyyy\') as fecha_creacion_encuesta, \
  to_char(e.fecha_cierre_encuesta::date,\'dd/mm/yyyy\') as fecha_cierre_encuesta, te.nombre_tipo_evento  from tipo_eventos te \
  inner join encuestas e \
  on te.cod_tipo_evento = e.cod_tipo_evento \
  where current_date <= e.fecha_cierre_encuesta \
  order by e.fecha_creacion_encuesta DESC ',
};
