import { Router } from 'express';
import estudianteControlador from '../controladores/EstudianteControlador';

class EstudianteRutas {
  public miRutaEstudiante: Router;

  constructor() {
    this.miRutaEstudiante = Router();
    this.listadoRutas();
  }

  public listadoRutas(): void {
    //listar encuestas
    this.miRutaEstudiante.get('/getAll/:codUsuario',estudianteControlador.listarEncuestas);
  }
}
const estudianteRutas = new EstudianteRutas();
export default estudianteRutas.miRutaEstudiante;
