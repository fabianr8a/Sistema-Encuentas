export const SQL_OPCIONES={
  CREAR_OPCIONES: 'INSERT INTO opciones(cod_pregunta, texto_opcion) VALUES ($1,$2)',

  SELECCIONAR_OPCIONES:'SELECT cod_opcion, cod_pregunta, texto_opcion \
	FROM opciones \
	where cod_pregunta=$1',

  ELIMINAR_OPCIONES:'DELETE FROM opciones WHERE cod_opcion=$1;'
}
