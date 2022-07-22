import { Router } from 'express';
import encuestaControlador from '../controladores/EncuestaControlador';

class EncuestaRutas {
  public miRutaEncuesta: Router;

  constructor() {
    this.miRutaEncuesta = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    this.miRutaEncuesta.get('/getAll',encuestaControlador.listarEncuestas);
    this.miRutaEncuesta.get('/eventos',encuestaControlador.listarEventos);
  }
}
const encuestaRutas = new EncuestaRutas();
export default encuestaRutas.miRutaEncuesta;
