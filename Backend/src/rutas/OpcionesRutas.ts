import { Router } from 'express';
import opcionControlador from '../controladores/OpcionControlador';

class OpcionRutas {
  public miRutaOpcion: Router;

  constructor() {
    this.miRutaOpcion = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    //listar opcion
    this.miRutaOpcion.get('/listar/:codPregunta', opcionControlador.listarOpcion);
    //seleccionar opcion
    this.miRutaOpcion.get('/seleccionar/:codOpcion', opcionControlador.seleccionarOpcion);
    //modificar
    this.miRutaOpcion.put('/modificar/:codOpcion', opcionControlador.modificarOpcion);
    //eliminar opcion
    this.miRutaOpcion.delete('/eliminar/:codOpcion', opcionControlador.eliminarOpcion);

  }
}
  const opcionRutas = new OpcionRutas();
  export default opcionRutas.miRutaOpcion;
