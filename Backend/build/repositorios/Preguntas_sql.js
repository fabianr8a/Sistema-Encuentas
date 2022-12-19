"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_PREGUNTAS = void 0;
exports.SQL_PREGUNTAS = {
    CREAR_PREGUNTAS: 'INSERT INTO preguntas(cod_tipo_pregunta, cod_encuesta, descripcion_pregunta) \
	VALUES ($1,$2,$3) RETURNING cod_pregunta',
    LISTAR_PREGUNTAS: 'select p.cod_pregunta, p.cod_encuesta, p.descripcion_pregunta,p.cod_tipo_pregunta, \
  (SELECT json_agg(json_build_object(\'codOpcion\',o.cod_opcion,\'codPregunta\',o.cod_pregunta,\'textoOpcion\',o.texto_opcion)) \
  FROM opciones o WHERE o.cod_pregunta=p.cod_pregunta) \
	AS arreglo_opciones \
  from preguntas as p \
  where p.cod_encuesta=$1',
    SELECCIONAR_PREGUNTA: 'SELECT cod_pregunta, cod_tipo_pregunta, cod_encuesta, descripcion_pregunta \
	FROM preguntas \
	where cod_pregunta=$1',
    MODIFICAR_PREGUNTA: 'UPDATE preguntas SET  descripcion_pregunta=$2 WHERE cod_pregunta=$1',
    ELIMINAR_PREGUNTA: 'DELETE FROM preguntas WHERE cod_pregunta=$1',
    ELIMINAR_TODAS_PREGUNTAS: 'DELETE FROM preguntas WHERE cod_encuesta=$1',
    SELECCIONAR_TODAS_PREGUNTAS: 'SELECT * FROM preguntas WHERE cod_encuesta = $1',
};
