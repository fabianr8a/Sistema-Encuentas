"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_IMA = void 0;
exports.SQL_IMA = {
    CREAR_IMAGEN: 'INSERT INTO Imagenes (nombre_publico_imagen, nombre_privado_imagen, \
   tipo_imagen) VALUES ($1, $2, $3) RETURNING cod_imagen',
    MODIFICAR_USUARIO_IMAGEN: 'UPDATE usuarios set cod_imagen = $1 WHERE cod_usuario = $2',
    BUSCAR_COD_IMAGEN: 'SELECT cod_imagen from usuarios where cod_usuario = $1',
    BUSCAR_IMAGEN_NOMBRE: 'SELECT nombre_privado_imagen from imagenes where cod_imagen = $1',
    BUSCAR_IMAGEN: 'SELECT nombre_publico_imagen, nombre_privado_imagen,\
    tipo_imagen from imagenes where cod_imagen = $1',
};
