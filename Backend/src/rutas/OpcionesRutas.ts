import { Router } from 'express';
import opcionControlador from '../controladores/OpcionControlador';

class OpcionRutas {
  public miRutaOpcion: Router;

  constructor() {
    this.miRutaOpcion = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    //seleccionar opcion
    this.miRutaOpcion.get('/seleccionar/:codOpcion', opcionControlador.seleccionarOpcion);
    //modificar
    this.miRutaOpcion.put('/modificar/:codOpcion', opcionControlador.modificarOpcion);
    //eliminar opcion
    this.miRutaOpcion.delete('/eliminar/:codOpcion', opcionControlador.eliminarOpcion);
    //agregar opcion
    this.miRutaOpcion.post('/crear', opcionControlador.crearOpciones);

  }
}
  const opcionRutas = new OpcionRutas();
  export default opcionRutas.miRutaOpcion;
