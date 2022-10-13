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
    this.miRutaEstudiante.get('/getAll',estudianteControlador.listarEncuestas);
    //obtener tipo dependencias
    this.miRutaEstudiante.get('/tipoDependencias',estudianteControlador.listarTiposDependencia);
  }
}
const estudianteRutas = new EstudianteRutas();
export default estudianteRutas.miRutaEstudiante;
