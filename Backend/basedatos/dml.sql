delete from roles
alter sequence roles_cod_rol_seq restart with 1;

INSERT INTO usuarios (cod_usuario, cod_rol,documento_usuario, tipo_documento_usuario, nombres_usuario, apellidos_usuario, telefono_usuario, estado_usuario,cod_imagen) VALUES (1, 1, 1099217312, 1, 'Melissa', 'Marin', 3144213220, 1,1);

INSERT INTO imagenes(cod_imagen, nombre_publico_imagen, nombre_privado_imagen, tipo_imagen) VALUES (1, 'publico.png', 'privado.png', 'png');

INSERT INTO accesos (cod_usuario, correo_acceso, clave_acceso) VALUES (1, 'melissa.marin@usantoto.edu.co', '19111a32d63d8bd579a2248594b511127b13f9fbf0f8ee5cf6f6baf3ead5c99a25f92d302c4650043c0aefbb1d90a74a8169f063c7a4c0bcb617c81fbd89f046');

INSERT INTO roles(nombre_rol, estado_rol) VALUES ('Administrador', 1);
INSERT INTO roles(nombre_rol, estado_rol) VALUES ('Docente', 1);
INSERT INTO roles(nombre_rol, estado_rol) VALUES ('Secretaria', 1);
INSERT INTO roles(nombre_rol, estado_rol) VALUES ('Estudiante', 1);
INSERT INTO roles(nombre_rol, estado_rol) VALUES ('Invitado', 1);

INSERT INTO encuestas(cod_dependencia,cod_tipo_evento,nombre_encuesta,fecha_creacion_encuesta,fecha_cierre_encuesta,descripcion_encuesta)
values (3,2,'Inteligencia artificial en la actualidad','12-07-2022','14-07-2022','Seminario sobre la conferencia impartida por el ingeniero Pepito Perez')

INSERT INTO dependencias(nombre_dependencia) values ('Departamentos');
INSERT INTO dependencias(nombre_dependencia) values ('Direcciones');
INSERT INTO dependencias(nombre_dependencia) values ('Facultades');
INSERT INTO dependencias(nombre_dependencia) values ('Unidades');

INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Administración de empresas');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Contaduría publica');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Cultura física, recreación y deporte');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Derecho');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Diseño e interacción');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Ingeniería ambiental');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Ingeniería civil');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Ingeniería de sistemas');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Ingeniería electrónica');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Ingeniería industrial');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Ingeniería mecánica');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Lic. En español y lenguas extranjeras');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (3,'Negocios internacionales');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Admisiones');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Adquisiciones y suministros');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Ciencias básicas');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Comunicaciones');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Contabilidad y presupuesto');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Gestión del talento humano');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Humanidades y formación integral');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Laboratorios');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Planta física y servicios generales');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Promoción y bienestar institucional');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'Sindicatura');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (1,'TIC');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (2,'Evangelización y cultura');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (2,'Investigación e innovación');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (2,'Planeación, desarrollo e información');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (2,'Proyección social y extensión');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (2,'Relaciones internacionales');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (4,'Evangelización y cultura');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (4,'Análisis de mercadeo');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (4,'Campus virtual');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (4,'Desarrollo curricular y formación docente');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (4,'Desarrollo integral de estudiantes');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (4,'Ediciones USTA');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (4,'Gestión integral de la calidad universitaria');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (4,'Posgrados de la división');
INSERT INTO tipo_dependencias(cod_dependencia,nombre_tipo_dependencia) values (4,'Registro y control académico');


INSERT INTO tipo_eventos (nombre_tipo_evento) values ('Claustro');
INSERT INTO tipo_eventos (nombre_tipo_evento) values ('Conferencia');
INSERT INTO tipo_eventos (nombre_tipo_evento) values ('Congreso');
INSERT INTO tipo_eventos (nombre_tipo_evento) values ('Foro');
INSERT INTO tipo_eventos (nombre_tipo_evento) values ('Seminario');
INSERT INTO tipo_eventos (nombre_tipo_evento) values ('Simposio');
INSERT INTO tipo_eventos (nombre_tipo_evento) values ('Taller académico');
INSERT INTO tipo_eventos (nombre_tipo_evento) values ('Webinar');

INSERT INTO tipo_preguntas (nombre_tipo_pregunta) values ('Fecha');
INSERT INTO tipo_preguntas (nombre_tipo_pregunta) values ('Pregunta abierta');
INSERT INTO tipo_preguntas (nombre_tipo_pregunta) values ('Opción múltiple');
INSERT INTO tipo_preguntas (nombre_tipo_pregunta) values ('Pregunta de escala (1 al 5)');
