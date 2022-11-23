export const SQL_REG_USU = {

  EXISTE_CORREO: 'select count(a.cod_usuario) as existe from accesos a \
    where a.correo_acceso = $1',

  AGREGAR_USUARIO:'INSERT INTO usuarios(cod_rol, documento_usuario, \
  tipo_documento_usuario, nombres_usuario, apellidos_usuario,telefono_usuario,cod_imagen,cod_tipo_dependencia) \
  VALUES(5, $1, 1, $2,$3,$4,1,$5) \
  RETURNING cod_usuario',

  AGREGAR_ACCESO: 'INSERT INTO accesos(cod_usuario, correo_acceso, clave_acceso) \
	VALUES ($1, $2, $3);',

  TODO_LISTO: 'SELECT u.cod_usuario, u.cod_rol, u.estado_usuario, r.nombre_rol, a.correo_acceso \
  FROM usuarios u INNER JOIN roles r ON u.cod_rol = r.cod_rol \
  INNER JOIN accesos a ON u.cod_usuario = a.cod_usuario \
  WHERE u.cod_usuario = $1'



}
