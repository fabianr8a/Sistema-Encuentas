import { Request, Response } from 'express';
import EstudianteDAO from '../daos/EstudianteDAO';
import { SQL_ENCUESTA_ESTUDIANTES } from '../repositorios/Estudiantes_sql';

class EstudianteControlador extends EstudianteDAO {

  public listarEncuestas(req: Request, res: Response) {
    EstudianteControlador.listarLasEncuestas(SQL_ENCUESTA_ESTUDIANTES.LISTAR_ENCUESTAS, req, res);
  }
}

const estudianteControlador = new EstudianteControlador();
export default estudianteControlador;