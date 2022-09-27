"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_PREGUNTAS = void 0;
exports.SQL_PREGUNTAS = {
    CREAR_PREGUNTAS: 'INSERT INTO preguntas(cod_tipo_pregunta, cod_encuesta, descripcion_pregunta) \
	VALUES ($1,$2,$3) RETURNING cod_pregunta',
    SELECCIONAR_PREGUNTAS: 'SELECT cod_pregunta, cod_tipo_pregunta, p.cod_encuesta, descripcion_pregunta \
	FROM preguntas as p \
	inner join encuestas as e \
	on p.cod_encuesta=e.cod_encuesta \
	where e.cod_encuesta=$1',
    MODIFICAR_PREGUNTA: 'UPDATE preguntas \
	SET  descripcion_pregunta=$2 \
	WHERE cod_pregunta=$1',
};
