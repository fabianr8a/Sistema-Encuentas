export const SQL_USUARIO = {

  TODOS: 'select cod_usuario, nombres_usuario, apellidos_usuario, documento_usuario, \
  (select correo_acceso from accesos where cod_usuario = usu.cod_usuario), \
  (select nombre_rol from roles where cod_rol = usu.cod_rol),telefono_usuario,\
  (select nombre_tipo_dependencia from tipo_dependencias where cod_tipo_dependencia = usu.cod_tipo_dependencia), \
  estado_usuario from usuarios as usu order by cod_usuario',

  CREAR: 'INSERT INTO usuarios (cod_rol, cod_imagen , documento_usuario, tipo_documento_usuario, nombres_usuario, \
  apellidos_usuario, telefono_usuario, estado_usuario, cod_tipo_dependencia) VALUES ($1, 1, $2, $3, $4, $5, $6, 1, $7) RETURNING cod_usuario',

  BUSCAR_USUARIO: 'select * from usuarios where cod_usuario = $1',

  MODIFICAR: 'UPDATE usuarios set cod_rol = $1, documento_usuario = $2, tipo_documento_usuario = $3, \
  nombres_usuario = $4, apellidos_usuario = $5, telefono_usuario = $6, estado_usuario = $7, cod_imagen=$8, cod_tipo_dependencia=$9 \
  where cod_usuario = $10',

}
