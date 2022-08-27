export const API_URL = 'http://localhost:3210/';

// Servicios públicos
export const API_INICIO = API_URL + 'api/public/access/login';
export const API_REGISTRO = API_URL + 'api/public/access/register';


// Servicios privados
/*********************Usuarios************/
export const API_USUARIO = API_URL + 'api/private/usuario/getAll';
export const API_USUARIO_CREAR = API_URL + 'api/private/usuario/create';
export const API_USUARIO_BUSCAR = API_URL + 'api/private/usuario/buscar';
export const API_USUARIO_MODIFICAR = API_URL + 'api/private/usuario/actualizar';
export const API_USUARIO_MODIFICAR_ACCESO = API_URL + 'api/private/usuario/actualizar-acceso';
export const API_USUARIO_BUSCAR_USUARIO = API_URL + 'api/private/usuario/buscar-usuario';
export const API_USUARIO_BUSCAR_ROL = API_URL + 'api/private/usuario/buscar-roles';
export const API_USUARIO_BUSCAR_ACCESO = API_URL + 'api/private/usuario/buscar-acceso';


/*********************Imagenes**************/
export const API_USUARIO_BUSCAR_IMAGEN = API_URL + 'api/private/usuario/buscar-imagen';
export const API_USUARIO_MODIFICAR_IMAGEN = API_URL + 'api/private/usuario/actualizar-imagen';

/*********************Roles**************/
export const API_ROL = API_URL + 'api/private/rol/getAll';
export const API_ROL_ELIMINAR = API_URL + 'api/private/rol/delete';
export const API_ROL_CREAR = API_URL + 'api/private/rol/create';
export const API_ROL_BUSCAR=API_URL + 'api/private/rol/buscar';
export const API_ROL_MODIFICAR=API_URL+'api/private/rol/actualizar';
export const API_ROL_BUSCAR_ROL=API_URL + 'api/private/rol/buscar-rol'

/*********************Listar encuestas**************/
export const API_ENCUESTA = API_URL + 'api/private/encuesta/getAll';

/******************Listar tipo de eventos********************/
export const API_ENCUESTA_EVENTOS = API_URL + 'api/private/encuesta/eventos';

/*********************Listar tipo de preguntas******************/
export const API_ENCUESTA_TIPO_PREGUNTAS = API_URL + 'api/private/encuesta/tipoPreguntas';

/**********************Listar dependencias**************************/
export const API_ENCUESTA_DEPENDENCIAS = API_URL + 'api/private/encuesta/dependencias';

/**********************Listar tipos de dependencias***********************/
export const API_ENCUESTA_TIPO_DEPENDENCIAS = API_URL + 'api/private/encuesta/tipoDependencias';

/***********************Crear encuesta******************/
export const API_CREAR_ENCUESTA=API_URL + 'api/private/encuesta/crear';

/***********************Seleccionar encuesta a modificar******************/
export const API_ENCUESTA_SELECCIONADA_MODIFICAR=API_URL + 'api/private/encuesta/encuestas';

/***********************Modificar encuesta******************/
export const API_MODIFICAR_ENCUESTA=API_URL + 'api/private/encuesta/modificar';









