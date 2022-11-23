import { Router } from 'express';
import estudianteControlador from '../controladores/UsuariosRespuestasControlador';

class EstudianteRutas {
  public miRutaEstudiante: Router;

  constructor() {
    this.miRutaEstudiante = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    //listar encuestas
    this.miRutaEstudiante.get('/getAll/:codUsuario',estudianteControlador.listarEncuestas);
    //Responder encuestas
    this.miRutaEstudiante.post('/responderEncuesta',estudianteControlador.ResponderEncuestas);
    //Responder encuestas
    this.miRutaEstudiante.get('/validarRespuestas/:codEncuesta',estudianteControlador.validarOpcionResponder);
  }
}
const estudianteRutas = new EstudianteRutas();
export default estudianteRutas.miRutaEstudiante;
