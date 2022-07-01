export const API_URL = 'http://localhost:3210/';

// Servicios públicos
export const API_INICIO = API_URL + 'api/public/access/login';
export const API_REGISTRO = API_URL + 'api/public/access/register';


// Servicios privados
/*********************Usuarios************/
export const API_USUARIO = API_URL + 'api/private/usuario/getAll';

/*********************Roles**************/
export const API_ROL = API_URL + 'api/private/rol/getAll';
export const API_ROL_ELIMINAR = API_URL + 'api/private/rol/delete';
export const API_ROL_CREAR = API_URL + 'api/private/rol/create';
export const API_ROL_BUSCAR=API_URL + 'api/private/rol/buscar';
export const API_ROL_MODIFICAR=API_URL+'api/private/rol/actualizar';
export const API_ROL_BUSCAR_ROL=API_URL + 'api/private/rol/buscar-rol'

