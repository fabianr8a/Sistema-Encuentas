import { Router } from 'express';
import preguntaControlador from '../controladores/PreguntaControlador';

class PreguntaRutas {
  public miRutaPregunta: Router;

  constructor() {
    this.miRutaPregunta = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    //listar preguntas
    this.miRutaPregunta.get('/preguntas/:codEncuesta', preguntaControlador.listarPregunta);
    //seleccionar pregunta
    this.miRutaPregunta.get('/seleccionar/:codPregunta', preguntaControlador.seleccionarPregunta)
    //modificar
    this.miRutaPregunta.put('/modificar/:codPregunta', preguntaControlador.modificarPregunta);
    //eliminar pregunta
    this.miRutaPregunta.delete('/eliminar/:codPregunta', preguntaControlador.eliminarPregunta);
    //agregar pregunta
    this.miRutaPregunta.post('/crear', preguntaControlador.crearPreguntas);
  }
}
  const preguntaRutas = new PreguntaRutas();
  export default preguntaRutas.miRutaPregunta;
