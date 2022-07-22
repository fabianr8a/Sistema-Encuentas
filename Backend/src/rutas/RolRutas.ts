import { Router } from 'express';
import rolControlador from '../controladores/RolControlador';

class RolRutas {
  public miRutaRol: Router;

  constructor() {
    this.miRutaRol = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    this.miRutaRol.get('/getAll', rolControlador.obtenerTodosRoles);
    this.miRutaRol.delete('/delete/:codigo', rolControlador.eliminarRol);
    this.miRutaRol.post('/create', rolControlador.crearRol);
    this.miRutaRol.post('/buscar', rolControlador.buscarRoles);
    this.miRutaRol.put('/actualizar/:codRol',rolControlador.modificarRol);
    this.miRutaRol.get('/buscar-rol/:codRol', rolControlador.buscarUnosRoles);


  }
}
const rolRutas = new RolRutas();
export default rolRutas.miRutaRol;
