import { Router } from 'express';
import encuestaControlador from '../controladores/EncuestaControlador';
import resultadosEncuestasControlador from '../controladores/ResultadosEncuestasControlador';

class ResultadosEncuestaRutas {
  public miRutaResultados: Router;

  constructor() {
    this.miRutaResultados = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    //listar encuestas
    this.miRutaResultados.get('/getAll/:codEncuesta',encuestaControlador.seleccionarEncuestaModificar);
    //Obtener respuestas
    this.miRutaResultados.get('/respuestas/:codPregunta',resultadosEncuestasControlador.listarRespuestas);
    //Obtener respuestas unicas
    this.miRutaResultados.get('/respuestasUnicas/:codPregunta',resultadosEncuestasControlador.listarRespuestasUnicas);
  }
}
const resultadosRutas = new ResultadosEncuestaRutas();
export default resultadosRutas.miRutaResultados;
