import { SQL_RESULTADOS_ENCUESTAS } from './../repositorios/Resultados_Encuestas_sql';
import { Request, Response } from 'express';
import ResultadosEncuestasDAO from '../daos/Resultados_EncuestasDAO';


class ResultadosEncuestasControlador extends ResultadosEncuestasDAO{

  public listarRespuestas(req: Request, res: Response) {
    const codigoPregunta = req.params.codPregunta;
    const miParametro = [codigoPregunta];
    ResultadosEncuestasControlador.listarRespuestas(SQL_RESULTADOS_ENCUESTAS.LISTAR_RESPUESTAS, miParametro,res);
  }

  public listarRespuestasUnicas(req: Request, res: Response) {
    const codigoPregunta = req.params.codPregunta;
    const miParametro = [codigoPregunta];
    ResultadosEncuestasControlador.listarRespuestas(SQL_RESULTADOS_ENCUESTAS.RESPUESTAS_UNICAS, miParametro,res);
  }

}
const resultadosEncuestasControlador = new ResultadosEncuestasControlador();
export default resultadosEncuestasControlador;