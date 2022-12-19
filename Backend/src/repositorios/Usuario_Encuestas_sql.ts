export const SQL_USUARIO_ENCUESTAS = {
  CREAR_USUARIO_ENCUESTAS:"INSERT INTO usuario_encuestas(cod_usuario, cod_encuesta)VALUES ($1, $2)",

  ELIMINAR_USUARIO_ENCUESTA:"DELETE FROM usuario_encuestas WHERE cod_encuesta=$1;",
};
