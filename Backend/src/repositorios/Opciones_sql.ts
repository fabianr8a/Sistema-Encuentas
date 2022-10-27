export const SQL_OPCIONES={
  CREAR_OPCIONES: 'INSERT INTO opciones(cod_pregunta, texto_opcion) VALUES ($1,$2)',

  LISTAR_OPCIONES:'select o.texto_opcion, o.cod_opcion, o.cod_pregunta, p.cod_pregunta, \
	( \
  SELECT array_to_json(array_agg(o)) \
  FROM opciones o \
  WHERE o.cod_pregunta = p.cod_pregunta \
) AS JSON \
from opciones as o \
inner join preguntas as p \
on o.cod_pregunta=p.cod_pregunta \
where p.cod_pregunta=$1',

  /*LISTAR_OPCIONES:'SELECT cod_opcion, cod_pregunta, texto_opcion \
  FROM opciones \
  where cod_pregunta=$1',*/

  SELECCIONAR_OPCION:'SELECT cod_opcion, cod_pregunta, texto_opcion \
	FROM opciones \
	where cod_opcion=$1',

  MODIFICAR_OPCIONES:'UPDATE opciones SET texto_opcion=$2 WHERE cod_opcion=$1',

  ELIMINAR_OPCIONES:'DELETE FROM opciones WHERE cod_opcion=$1;'
}
