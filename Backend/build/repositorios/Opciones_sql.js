"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_OPCIONES = void 0;
exports.SQL_OPCIONES = {
    CREAR_OPCIONES: 'INSERT INTO opciones(cod_pregunta, texto_opcion) VALUES ($1,$2)',
    LISTAR_OPCIONES: 'SELECT cod_opcion, cod_pregunta, texto_opcion \
	FROM opciones \
	where cod_pregunta=$1',
    SELECCIONAR_OPCION: 'SELECT cod_opcion, cod_pregunta, texto_opcion \
	FROM opciones \
	where cod_opcion=$1',
    MODIFICAR_OPCIONES: 'UPDATE opciones SET texto_opcion=$2 WHERE cod_opcion=$1',
    ELIMINAR_OPCIONES: 'DELETE FROM opciones WHERE cod_opcion=$1;'
};
