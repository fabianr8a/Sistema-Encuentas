import { Router } from 'express';
import usuarioControlador from '../controladores/UsuarioControlador';
import rolControlador from '../controladores/RolControlador';
import accesoControlador from '../controladores/AccesoControlador';
import imagenControlador from '../controladores/ImagenControlador';

class UsuarioRutas {
  public miRutaUsuario: Router;

  constructor() {
    this.miRutaUsuario = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    this.miRutaUsuario.get('/getAll', usuarioControlador.obtenerTodosUsuario);
    this.miRutaUsuario.post('/create', usuarioControlador.crearUsuario);
    this.miRutaUsuario.put('/actualizar/:codUsuario', usuarioControlador.actualizarUsuario);
    this.miRutaUsuario.put('/actualizar-acceso/:codUsuario', accesoControlador.actualizarAcceso);
    this.miRutaUsuario.get('/buscar-usuario/:codUsuario', usuarioControlador.buscarUnUsuario);
     this.miRutaUsuario.get('/buscar-roles', rolControlador.buscarNombreRoles);
    this.miRutaUsuario.get('/buscar-acceso/:codUsuario', accesoControlador.buscarUnAcceso);
    this.miRutaUsuario.get('/buscar-imagen/:codUsuario', imagenControlador.buscarUnaImagen);
    this.miRutaUsuario.put('/actualizar-imagen/:codUsuario', imagenControlador.actualizarImagen);
  }
}
const usuarioRutas = new UsuarioRutas();
export default usuarioRutas.miRutaUsuario;
