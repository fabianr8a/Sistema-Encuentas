import { Router } from 'express';
import preguntaControlador from '../controladores/PreguntaControlador';

class PreguntaRutas {
  public miRutaPregunta: Router;

  constructor() {
    this.miRutaPregunta = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    //seleccionar pregunta para modificar
    this.miRutaPregunta.get('/preguntas/:codEncuesta', preguntaControlador.seleccionarPregunta);
    //modificar
    this.miRutaPregunta.put('/modificar/:codPregunta', preguntaControlador.modificarPregunta);
  }
}
  const preguntaRutas = new PreguntaRutas();
  export default preguntaRutas.miRutaPregunta;
