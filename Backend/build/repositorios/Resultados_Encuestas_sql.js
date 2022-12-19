"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_RESULTADOS_ENCUESTAS = void 0;
exports.SQL_RESULTADOS_ENCUESTAS = {
    LISTAR_RESPUESTAS: 'SELECT cod_pregunta, respuesta_abierta, \
to_char(respuesta_fecha::date,\'dd/mm/yyyy\') as respuesta_fecha FROM usuarios_respuestas where cod_pregunta = $1',
    RESPUESTAS_UNICAS: 'SELECT o.cod_pregunta, o.texto_opcion, count (res.cod_opcion) as contador \
FROM usuarios_respuestas as res \
inner join opciones as o \
on o.cod_opcion=res.cod_opcion \
where res.cod_pregunta= $1 \
group by o.cod_pregunta, o.texto_opcion '
};
