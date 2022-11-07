import { Router } from 'express';
import encuestaControlador from '../controladores/EncuestaControlador';

class ResultadosEncuestaRutas {
  public miRutaResultados: Router;

  constructor() {
    this.miRutaResultados = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    //listar encuestas
    this.miRutaResultados.get('/getAll/:codEncuesta',encuestaControlador.seleccionarEncuestaModificar);
  }
}
const resultadosRutas = new ResultadosEncuestaRutas();
export default resultadosRutas.miRutaResultados;
