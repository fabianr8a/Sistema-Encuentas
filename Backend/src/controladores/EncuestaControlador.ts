import { Request, Response } from 'express';
import RolDAO from '../daos/EncuestaDAO';
import { SQL_ENCUESTA } from '../repositorios/Encuestas_sql';

class EncuestaControlador extends RolDAO {

  public listarEncuestas(req: Request, res: Response) {
    EncuestaControlador.listarLasEncuestas(SQL_ENCUESTA.LISTAR, req, res);
  }

  public listarEventos(req: Request, res: Response) {
    EncuestaControlador.listarLosEventos(SQL_ENCUESTA.LISTAR_EVENTOS, req, res);
  }

}
const encuestaControlador = new EncuestaControlador();
export default encuestaControlador;
