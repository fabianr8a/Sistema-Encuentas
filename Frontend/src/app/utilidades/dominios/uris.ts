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
export const API_USUARIO_BUSCAR_ACCESO = API_URL + 'api/private/usuario/buscar-acceso';


/*********************Imagenes**************/
export const API_USUARIO_BUSCAR_IMAGEN = API_URL + 'api/private/usuario/buscar-imagen';
export const API_USUARIO_MODIFICAR_IMAGEN = API_URL + 'api/private/usuario/actualizar-imagen';


/*********************Roles**************/
export const API_ROL = API_URL + 'api/private/rol/getAll';
export const API_ROL_ELIMINAR = API_URL + 'api/private/rol/delete';
export const API_ROL_CREAR = API_URL + 'api/private/rol/create';
export const API_ROL_MODIFICAR=API_URL+'api/private/rol/actualizar';
export const API_ROL_BUSCAR_ROL=API_URL + 'api/private/rol/buscar-rol'


/**********************Encuestas****************/
export const API_ENCUESTA = API_URL + 'api/private/encuesta/getAll';
export const API_CREAR_ENCUESTA=API_URL + 'api/private/encuesta/crear';
export const API_ENCUESTA_SELECCIONADA_MODIFICAR=API_URL + 'api/private/encuesta/encuestas';
export const API_MODIFICAR_ENCUESTA=API_URL + 'api/private/encuesta/modificar';
export const API_ELIMINAR_ENCUESTA=API_URL + 'api/private/encuesta/eliminar';

/***************Listar tipo de eventos*************/
export const API_ENCUESTA_EVENTOS = API_URL + 'api/private/encuesta/eventos';

/***************Listar tipo de preguntas***********/
export const API_ENCUESTA_TIPO_PREGUNTAS = API_URL + 'api/private/encuesta/tipoPreguntas';

/***************Listar dependencias*****************/
export const API_ENCUESTA_DEPENDENCIAS = API_URL + 'api/private/encuesta/dependencias';

/***************Listar tipos de dependencias*******/
export const API_ENCUESTA_TIPO_DEPENDENCIAS = API_URL + 'api/private/encuesta/tipoDependencias';


/*********************Estudiante*********************/
export const API_LISTAR_ENCUESTAS = API_URL + 'api/private/estudiante/getAll';
export const API_RESPONDER_ENCUESTA = API_URL + 'api/private/estudiante/responderEncuesta';
export const API_VALIDAR_RESPUESTAS= API_URL + 'api/private/estudiante/validarRespuestas';


/*******************Preguntas*********************/
export const API_SELECCIONAR_PREGUNTA=API_URL + 'api/private/pregunta/preguntas'
export const API_CREAR_PREGUNTA= API_URL + 'api/private/pregunta/crear'
export const API_MODIFICAR_PREGUNTA=API_URL + 'api/private/pregunta/modificar'
export const API_ELIMINAR_PREGUNTA=API_URL + 'api/private/pregunta/eliminar'


/********************Opciones*******************/
export const API_LISTAR_OPCIONES=API_URL + 'api/private/opciones/listar'
export const API_ELIMINAR_OPCIONES=API_URL + 'api/private/opciones/eliminar'
export const API_SELECCIONAR_OPCION=API_URL + 'api/private/opciones/seleccionar'
export const API_MODIFICAR_OPCIONES= API_URL + 'api/private/opciones/modificar'


/********************Resultados****************/
export const API_RESPUESTAS = API_URL + 'api/private/resultados/respuestas';
export const API_RESPUESTAS_UNICAS = API_URL + 'api/private/resultados/respuestasUnicas';





