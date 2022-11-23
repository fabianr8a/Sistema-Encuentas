"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_RESULTADOS_ENCUESTAS = void 0;
exports.SQL_RESULTADOS_ENCUESTAS = {
    LISTAR_RESPUESTAS: 'SELECT cod_pregunta, respuesta_abierta, to_char(respuesta_fecha::date,\'dd/mm/yyyy\') as respuesta_fecha,\
cod_opcion FROM usuarios_respuestas where cod_pregunta = $1',
};
