CREATE TABLE usuarios(
	cod_usuario SERIAL NOT NULL,
	cod_rol int4 not NULL,
	documento_usuario varchar (50) not NULL,
tipo_documento_usuario int2 not null default 1
constraint ckc_tipo_documento_usu_usuarios check (tipo_documento_usuario in (1,2,3,4,5,6)),
	nombres_usuario varchar (60) not null,
	apellidos_usuario varchar (80) not null,
telefono_usuario varchar (50) not null,
estado_usuario int2 null default 1,
	CONSTRAINT ckc_estado_usuario_usuarios check (estado_usuario is null or (estado_usuario in (1,2))),
constraint pk_usuarios primary key (cod_usuario)
);

comment on column usuarios.tipo_documento_usuario is '
codigo: 1, acronimo: CC, tipo: Cedula de Ciudadania
codigo: 2, acronimo: TI, tipo: Tarjeta de Identidad
codigo: 3, acronimo: TE, tipo: Tarjeta Extranjeria
codigo: 4, acronimo: PN, tipo: Pasaporte Nacional
codigo: 5, acronimo: TR, tipo: Tarjeta Residente
codigo: 6, acronimo: RG, tipo: Registro Civil';

comment on column usuarios.estado_usuario is
'1 activo
2 inactivo';

alter table usuarios owner to user_encuestas;
alter table usuarios drop column correo_usuario

create unique index indice_doc on usuarios (documento_usuario);



CREATE TABLE accesos(
cod_usuario int4 NOT NULL,
correo_acceso varchar (100) not null,
clave_acceso varchar (150) not null,
CONSTRAINT pk_accesos primary key (cod_usuario)
);

alter table accesos owner to user_encuestas;

create unique index indice_correo on accesos (correo_acceso);

CREATE TABLE imagenes(
cod_imagen SERIAL not null,
cod_usuario int4 not null,
nombre_publico_imagen varchar(200 ) not null,
nombre_privado_imagen varchar (200) not null,
tipo_imagen varchar (50) not null,
tamano_imagen varchar (50) not null,
favorita_imagen int2 not null default 2
CONSTRAINT ckc_favorita_imagen_imagenes check (favorita_imagen in (1,2)),
constraint pk_imagenes primary key (cod_imagen)
);

comment on column imagenes.favorita_imagen is '1 seleccionada 2 otras';

alter table imagenes owner to user_encuestas;

CREATE TABLE ingresos(
cod_ingreso SERIAL not null,
cod_usuario int4 not null,
fecha_ingreso DATE not null,
hora_ingreso TIME not null,
CONSTRAINT pk_ingresos PRIMARY KEY (cod_ingreso));

alter table ingresos owner to user_encuestas;


CREATE TABLE roles(
cod_rol SERIAL NOT NULL,
nombre_rol varchar(200) not null,
estado_rol int2 NOT NULL
constraint ckc_estado_rol_roles check (estado_rol in(1,2)),
constraint pk_roles primary key (cod_rol)
);

comment on column roles.estado_rol is
'1 activo
2 inactivo';

alter table roles owner to user_encuestas;


alter table accesos
add constraint fk_accesos_ref_usuarios foreign key (cod_usuario)
references usuarios (cod_usuario)
on delete restrict on update cascade;

alter table imagenes
add constraint fk_imagenes_ref_usuarios foreign key (cod_usuario)
references usuarios (cod_usuario)
on delete restrict on update cascade;

alter table ingresos
add constraint fk_ingresos_ref_accesos foreign key (cod_usuario)
references accesos (cod_usuario)
on delete restrict on update cascade;

alter table usuarios
add constraint fk_usuarios_ref_roles foreign key (cod_rol)
references roles (cod_rol)
on delete restrict on update cascade;
