delete from roles
alter sequence roles_cod_rol_seq restart with 1;

INSERT INTO roles(nombre_rol, estado_rol) VALUES ('Administrador', 1);
INSERT INTO roles(nombre_rol, estado_rol) VALUES ('Docente', 1);
INSERT INTO roles(nombre_rol, estado_rol) VALUES ('Secretaria', 1);
INSERT INTO roles(nombre_rol, estado_rol) VALUES ('Estudiante', 1);
INSERT INTO roles(nombre_rol, estado_rol) VALUES ('Invitado', 1);


INSERT INTO usuarios (cod_usuario, cod_rol, documento_usuario, tipo_documento_usuario, nombres_usuario, apellidos_usuario, telefono_usuario, estado_usuario) VALUES (1, 1, 1099217312, 1, 'Melissa', 'Marin', 3144213220, 1);

INSERT INTO accesos (cod_usuario, correo_acceso, clave_acceso) VALUES (1, 'melissa.marin@usantoto.edu.co', '19111a32d63d8bd579a2248594b511127b13f9fbf0f8ee5cf6f6baf3ead5c99a25f92d302c4650043c0aefbb1d90a74a8169f063c7a4c0bcb617c81fbd89f046');
