import { Router } from 'express';
import encuestaControlador from '../controladores/EncuestaControlador';

class EncuestaRutas {
  public miRutaEncuesta: Router;

  constructor() {
    this.miRutaEncuesta = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    //listar encuestas
    this.miRutaEncuesta.get('/getAll',encuestaControlador.listarEncuestas);
    //obtener tipo de eventos
    this.miRutaEncuesta.get('/eventos',encuestaControlador.listarEventos);
    //buscar una encuesta
    this.miRutaEncuesta.post('/buscar', encuestaControlador.buscarEncuestas);
  }
}
const encuestaRutas = new EncuestaRutas();
export default encuestaRutas.miRutaEncuesta;
