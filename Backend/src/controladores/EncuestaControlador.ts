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

  public buscarEncuestas(req: Request, res: Response) {
    const buscar = req.body.nombreEncuesta;
    const miParametro = [buscar];
    if (buscar === '') {
      EncuestaControlador.listarLasEncuestas(SQL_ENCUESTA.LISTAR, req, res);
    } else {
      EncuestaControlador.buscarEncuesta(SQL_ENCUESTA.BUSCAR, miParametro, res);
    }
  }

}
const encuestaControlador = new EncuestaControlador();
export default encuestaControlador;
