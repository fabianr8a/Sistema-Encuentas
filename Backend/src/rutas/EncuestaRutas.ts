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
    this.miRutaEncuesta.get('/getAll/:codUsuario',encuestaControlador.listarEncuestas);
    //obtener tipo de eventos
    this.miRutaEncuesta.get('/eventos',encuestaControlador.listarEventos);
    //obtener tipo de preguntas
    this.miRutaEncuesta.get('/tipoPreguntas',encuestaControlador.listarTipoPreguntas);
    //obtener dependencias
    this.miRutaEncuesta.get('/dependencias',encuestaControlador.listarDependencias);
    //obtener tipo dependencias
    this.miRutaEncuesta.get('/tipoDependencias',encuestaControlador.listarTiposDependencia);
    //crear encuestas
    this.miRutaEncuesta.post('/crear', encuestaControlador.crearEncuesta);
    //seleccionar encuesta para modificar
    this.miRutaEncuesta.get('/encuestas/:codEncuesta', encuestaControlador.seleccionarEncuestaModificar);
    //modificar encuesta
    this.miRutaEncuesta.put('/modificar/:codEncuesta',encuestaControlador.modificarEncuesta);
    //eliminar encuesta
    this.miRutaEncuesta.delete('/eliminar/:codEncuesta', encuestaControlador.eliminarEncuesta);
  }
}
const encuestaRutas = new EncuestaRutas();
export default encuestaRutas.miRutaEncuesta;
