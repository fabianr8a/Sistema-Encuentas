"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_ENCUESTA = void 0;
exports.SQL_ENCUESTA = {
    LISTAR: 'select  e.nombre_encuesta, e.fecha_creacion_encuesta,e.fecha_cierre_encuesta, te.nombre_tipo_evento  from tipo_eventos te \
  inner join encuestas e \
  on te.cod_tipo_evento = e.cod_tipo_evento \
  order by e.fecha_creacion_encuesta',
    LISTAR_EVENTOS: 'SELECT * FROM tipo_eventos',
    LISTAR_TIPO_PREGUNTAS: 'select * from tipo_preguntas',
    LISTAR_DEPENDENCIAS: 'select * from dependencias',
    LISTAR_TIPO_DEPENDENCIAS: 'select * from tipo_dependencias \
  where cod_dependencia =$1',
    CREAR_ENCUESTA: 'INSERT INTO encuestas(cod_dependencia, cod_tipo_evento, nombre_encuesta, descripcion_encuesta, fecha_creacion_encuesta, fecha_cierre_encuesta) \
	VALUES ($1, $2, $3, $4, $5, $6) RETURNING cod_encuesta',
    CREAR_PREGUNTAS: 'INSERT INTO preguntas(cod_tipo_pregunta, cod_encuesta, descripcion_pregunta) \
	VALUES ($1,$2,$3) RETURNING cod_pregunta',
};
