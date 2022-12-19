"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_USUARIO_ENCUESTAS = void 0;
exports.SQL_USUARIO_ENCUESTAS = {
    CREAR_USUARIO_ENCUESTAS: "INSERT INTO usuario_encuestas(cod_usuario, cod_encuesta)VALUES ($1, $2)",
    ELIMINAR_USUARIO_ENCUESTA: "DELETE FROM usuario_encuestas WHERE cod_encuesta=$1;",
};
