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
    RESPONDER_PREGUNTA_FECHA: 'INSERT INTO usuarios_respuestas(cod_usuario, cod_pregunta, respuesta_fecha) \
	VALUES ($1,$2,$3)',
    RESPONDER_PREGUNTA_ABIERTA: 'INSERT INTO usuarios_respuestas(cod_usuario, cod_pregunta, respuesta_abierta) \
	VALUES ($1,$2,$3)',
    RESPONDER_PREGUNTA_OPCION: 'INSERT INTO usuarios_respuestas(cod_usuario, cod_pregunta, cod_opcion) \
	VALUES ($1,$2,$3)'
};
