export const SQL_ACCESO = {

  INICIAR_SESION_DATOS: 'SELECT u.cod_usuario,  u.nombres_usuario, a.correo_acceso, \
  u.apellidos_usuario, r.nombre_rol, r.estado_rol FROM accesos a INNER JOIN usuarios u ON u.cod_usuario = a.cod_usuario \
  INNER JOIN roles r ON r.cod_rol = u.cod_rol WHERE correo_acceso = $1 AND clave_acceso = $2',



}
